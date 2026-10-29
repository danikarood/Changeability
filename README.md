****Changeability****

DV200 · Interactive Development 200: From Design to DeploymentA full-stack, responsive web application for managing operations at ChangeAbility NGO—connecting people, care, and possibility

**Live Deployments**
This application is not deployed hence no use to the public but Stitched.
Platform 1 (Azure /Stitched): https://black-pond-0ff12f910.2.azurestaticapps.net/

📹 Demonstration VideoWatch the complete feature walkthrough and deployment demonstration:https://drive.google.com/file/d/1hiT15VJtDNFMR3oYKac_Q9wYsKCLIa3N/view?usp=sharing

**Design Reference & AttributionSource Design:** UX200 Design AssignmentOriginal UX/UI Designer: UX200 Student Design SpecificationImplementation Scope: Translated pixel-accurate desktop and responsive mobile layouts from the provided UX200 mockups into modular React components, preserving brand typography (Merriweather & Raleway) and color palettes.Visual IdentityPrimary CTA Accent: Warm Orange (#E8642F)Secondary Accent: Red-Orange (#D4613A)Background Canvas: Soft Warm Beige (#EFECE6)Card & Module Surfaces: Ivory Cream (#F5F1EA)

**Key Features & User Experience**
Authentication Gateway (/login, /signup)Responsive dual-column view with decorative branding patterns.Interactive password show/hide toggles and credentials state validation.Sticky Navigation System (Sidebar)Fixed positioning with full-height canvas scrolling.Active tab styling with white pill indicators using react-router-dom.Analytics Dashboard (/dashboard)Visual charts for Disability classifications, Dietary requirements, and Age & Gender demographics.Embedded organic geometric background patterns within card negative spaces.Beneficiaries Directory (/beneficiaries)Dynamic Grid View (Cards) vs. List View (Rows) toggling via React state.Real-time search filter and program tags (H&AP, CS&D).Volunteers Directory (/volunteers)Grid and List layout modes with complete contact and program metadata.Interactive Calendar (/calendar)Full month calendar grid paired with an Upcoming Events feed.Interactive "Add Event" Modal Popup: pushes new events dynamically to both the month grid and upcoming feed.Dynamic Profile View (/profile)Unified profile view rendering detailed records for both beneficiaries and volunteers using location route state.

**Tech Stack & ArchitectureFrontend:** React 18 (Vite build tool), React Router DOM v6, Custom Modular CSS variables.Backend API: Node.js, Express.js.Database: MongoDB Atlas (Mongoose ODM).Utilities & Environment: Axios, CORS, Dotenv, Nodemon.

**Repository StructureChangeability**/
├── backend/
│   ├── models/
│   │   ├── User.js          # Authentication Schema
│   │   ├── Entity.js        # Beneficiaries & Volunteers Schema
│   │   └── Event.js         # Calendar Events Schema
│   ├── .env                 # Secret environment variables (Git-ignored)
│   ├── package.json
│   └── server.js            # Node/Express API & Database Connection
│
├── src/
│   ├── assets/              # Logo & graphic assets
│   ├── components/
│   │   └── Sidebar.jsx      # Sticky Navigation Bar
│   ├── pages/
│   │   ├── Login.jsx        # Login View
│   │   ├── SignUp.jsx       # Registration View
│   │   ├── Dashboard.jsx    # Analytics & Metrics View
│   │   ├── Beneficiaries.jsx# Beneficiaries List/Grid View
│   │   ├── Volunteers.jsx   # Volunteers Directory
│   │   ├── Calendar.jsx     # Event Grid & Modal Popup
│   │   └── ProfileView.jsx  # Detailed Individual Profile View
│   ├── utils/
│   │   └── api.js           # Axios Configuration Instance
│   ├── App.jsx              # Routes Registry
│   └── main.jsx             # Application Root
│
└── README.md                # Submission Documentation
 
**API Endpoint Reference **
MethodEndpointDescriptionPOST/api/auth/signupRegister new administrative userPOST/api/auth/loginAuthenticate user credentialsGET/api/entities/beneficiaryRetrieve list of beneficiariesGET/api/entities/volunteerRetrieve list of volunteersPOST/api/entitiesCreate new beneficiary/volunteer recordGET/api/eventsFetch calendar eventsPOST/api/eventsCreate new calendar event

**Local Setup **
InstructionsPrerequisitesNode.js (v18+)MongoDB Atlas cluster or local MongoDB setup1. Backend Server Setupcd backend
npm install
Create a .env file in the backend/ folder:PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
Start the API server:npm run dev
2. Frontend SetupOpen a second terminal window at the project root:npm install
npm run dev
