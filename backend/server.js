require('dotenv').config();

const dns = require('node:dns');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const dnsServers = (process.env.DNS_SERVERS || '')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);
if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

const mongoose = require('mongoose');

const authenticate = require('./middleware/authenticate');
const Entity = require('./models/Entity');
const Event = require('./models/Event');
const User = require('./models/User');

const app = express();
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
const entityFields = [
  'name',
  'age',
  'gender',
  'programme',
  'programmeFull',
  'email',
  'phone',
  'address',
  'img',
  'status',
];

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
      .split(',')
      .map((item) => item.trim());
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const error = new Error('Origin is not allowed by CORS.');
    error.status = 403;
    return callback(error);
  },
}));
app.use(express.json({ limit: '10mb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again later.' },
});

function requireBodyObject(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('Request body must be a JSON object.');
    error.status = 400;
    throw error;
  }
}

function getEntityType(type) {
  if (type !== 'beneficiary' && type !== 'volunteer') {
    const error = new Error('Entity type must be "beneficiary" or "volunteer".');
    error.status = 400;
    throw error;
  }
  return type;
}

function pickFields(source, fields) {
  return fields.reduce((result, field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      result[field] = source[field];
    }
    return result;
  }, {});
}

function validateEventDate(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const error = new Error('Date must use the YYYY-MM-DD format.');
    error.status = 400;
    throw error;
  }
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
    const error = new Error('Date is not valid.');
    error.status = 400;
    throw error;
  }
}

function getEventFields(body, currentEvent) {
  const title = body.title ?? currentEvent?.title;
  const date = body.date ?? currentEvent?.date;
  const time = body.time ?? currentEvent?.time;

  if (typeof title !== 'string' || !title.trim()) {
    const error = new Error('Event title is required.');
    error.status = 400;
    throw error;
  }
  validateEventDate(date);
  if (typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
    const error = new Error('Event time must use the HH:MM format.');
    error.status = 400;
    throw error;
  }

  const [year, month, day] = date.split('-').map(Number);
  const displayDate = new Date(Date.UTC(year, month - 1, day))
    .toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'numeric', year: '2-digit' });

  return { title: title.trim(), date, displayDate, dayNumber: day, time };
}

function signToken(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: userId.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.post('/api/auth/signup', authLimiter, asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const fullName = typeof req.body.fullName === 'string' ? req.body.fullName.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = req.body.password;

  if (fullName.length < 2 || fullName.length > 120) {
    return res.status(400).json({ error: 'Full name must be between 2 and 120 characters.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
    return res.status(400).json({ error: 'Password must be between 8 and 72 characters.' });
  }

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ fullName, email, password: passwordHash });
  return res.status(201).json({ token: signToken(user._id), user });
}));

app.post('/api/auth/login', authLimiter, asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = req.body.password;
  if (!email || typeof password !== 'string') {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  return res.json({
    token: signToken(user._id),
    user: { id: user.id, fullName: user.fullName, email: user.email },
  });
}));

app.use('/api/entities', authenticate);

app.get('/api/entities/:type', asyncHandler(async (req, res) => {
  const type = getEntityType(req.params.type);
  const entities = await Entity.find({ type }).sort({ createdAt: -1 });
  return res.json(entities);
}));

app.post('/api/entities', asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const type = getEntityType(req.body.type);
  const entity = await Entity.create({ ...pickFields(req.body, entityFields), type });
  return res.status(201).json(entity);
}));

app.get('/api/entities/:type/:id', asyncHandler(async (req, res) => {
  const type = getEntityType(req.params.type);
  const entity = await Entity.findOne({ _id: req.params.id, type });
  if (!entity) return res.status(404).json({ error: 'Record not found.' });
  return res.json(entity);
}));

app.put('/api/entities/:type/:id', asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const type = getEntityType(req.params.type);
  const entity = await Entity.findOneAndUpdate(
    { _id: req.params.id, type },
    { $set: pickFields(req.body, entityFields) },
    { new: true, runValidators: true },
  );
  if (!entity) return res.status(404).json({ error: 'Record not found.' });
  return res.json(entity);
}));

app.delete('/api/entities/:type/:id', asyncHandler(async (req, res) => {
  const type = getEntityType(req.params.type);
  const entity = await Entity.findOneAndDelete({ _id: req.params.id, type });
  if (!entity) return res.status(404).json({ error: 'Record not found.' });
  return res.status(204).end();
}));

app.use('/api/events', authenticate);

app.get('/api/events', asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ date: 1, time: 1 });
  return res.json(events);
}));

app.post('/api/events', asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const event = await Event.create(getEventFields(req.body));
  return res.status(201).json(event);
}));

app.get('/api/events/:id', asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  return res.json(event);
}));

app.put('/api/events/:id', asyncHandler(async (req, res) => {
  requireBodyObject(req.body);
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  Object.assign(event, getEventFields(req.body, event));
  await event.save();
  return res.json(event);
}));

app.delete('/api/events/:id', asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  return res.status(204).end();
}));

app.use((req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error.code === 11000) {
    return res.status(409).json({ error: 'A record with that unique value already exists.' });
  }
  if (error.name === 'ValidationError' || error.name === 'CastError' || error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: error.message });
  }
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error('API request failed:', error);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required. Set it in backend/.env.');
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET is required and must be at least 32 characters long.');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const port = Number(process.env.PORT) || 5000;
  return app.listen(port, () => {
    console.log(`ChangeAbility API listening on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Unable to start the API server:', error.message);
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
