# DV200 S1 - Scrum Analytics Project
**Student Name:** Danika Rood  
**Project:** URC Team Comparison & Data Visualisation

---

## 🎥 Project Walkthrough Video
Because the video file was too large to submit directly to the platform, I have uploaded my screen recording to Google Drive. 
[https://drive.google.com/drive/folders/1kTmfApFjkKWwnxJd4zFYd0XLYrhXEBhG?usp=sharing]

*(Note to lecturer: Please ensure you use this link directly. I have set the access permissions to "Anyone with the link" so you shouldn't need to request access!)*

---

## 📝 About the Project
For this project, I built a React application that connects to a live Rugby API to fetch and compare statistics for the 2024 United Rugby Championship (URC) season. 

### Key Features:
* **Interactive Landing Page:** A custom homepage with an auto-scrolling carousel showcasing the teams.
* **Live API Data:** Fetches active 2024 season match data directly from `api-sports.io`.
* **Head-to-Head Comparison:** Users can select any two teams from a dropdown to compare their performance side-by-side.
* **Charts & Visuals:** I used Chart.js to render Points Bar Charts, Season Win/Loss Pie Charts, and a custom Skills Radar Chart.
* **Local Assets Fallback:** Because the API images were sometimes failing to load or giving broken links, I manually downloaded high-quality logos for the main teams and hosted them locally in the project assets folder to make sure the app looks premium.

---

## 🛠️ How to Run the App Locally

If you want to pull the project and run it on your local machine, just follow these steps:

1. Clone the GitHub repository:
   `git clone [PLAK_JOU_GITHUB_REPO_LINK_HIER]`
2. Open your terminal and navigate into the folder:
   `cd scrum_analytics`
3. Install the required Node modules:
   `npm install`
4. Run the project locally:
   `npm start`

---
*Thank you for taking the time to assess my project!*

## ChangeAbility MongoDB API

The ChangeAbility frontend is a Create React App project in `frontend/`. Its API is an Express and MongoDB service in `backend/`.

1. Install the API dependencies with `npm install --prefix backend`.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and a private `JWT_SECRET` of at least 32 characters. Generate a secret with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. For a local MongoDB instance, the example URI is ready to use. For MongoDB Atlas, replace it with your Atlas connection string.
   If Node.js cannot resolve Atlas SRV records on your network, optionally set `DNS_SERVERS` to a comma-separated DNS resolver IP available on that machine.
3. Optionally copy `frontend/.env.example` to `frontend/.env` to override the API URL.
4. Start the API in one terminal with `npm run server` from the repository root.
5. Start the frontend in another terminal with `npm start`.

Sign-up and sign-in return a JWT; the frontend sends it with requests to protected API routes. Passwords are stored as bcrypt hashes. Beneficiary, volunteer, and event records are stored in MongoDB. Data screens require signing in and show an API error if the service or database is unavailable.