🌈 Rainbow Planner 3

A full-stack web app for managing a Rainbows unit (Girlguiding).
It helps leaders keep track of enquiries → members → exits, with configurable eligibility rules and reporting.

Built with:

Frontend: React 19 + Vite + React Router

Backend: Node.js (Express)

Database: PostgreSQL (with node-pg-migrate)

✨ Features

📋 Enquiries Management

Add new enquiries (children interested in joining).

Mark enquiries as eligible/ineligible.

Promote enquiries → members.

👧 Members Management

View current members.

Exit members with reasons.

Track join/exit dates.

⚙️ Settings & Config

Store app-wide rules (e.g. min months remaining, term dates).

Editable via API (future: UI).

🗂 Choices (Dropdowns)

Statuses, exit reasons, and other lists configurable from DB.

🌈 UI

Rainbow-themed design (based on Girlguiding Rainbows branding).

Responsive navigation bar.

Tables for enquiries and members.

Modal form for adding enquiries.

🛠️ Setup Instructions
1. Clone repo
git clone <your-repo-url> rainbow_planner3
cd rainbow_planner3

2. Backend
cd backend
npm install


Create a .env file:

DATABASE_URL=postgres://postgres:<password>@localhost:5432/rainbow_planner3
PORT=3001


Create DB + run migrations:

psql -U postgres -c "CREATE DATABASE rainbow_planner3;"
npm run migrate up


Run backend:

npm run dev


API should be live on http://localhost:3001
.

3. Frontend
cd ../frontend
npm install


Run frontend:

npm run dev


Visit: http://localhost:5173
.

📂 Project Structure
rainbow_planner3/
├─ backend/
│  ├─ src/
│  │  ├─ index.js         # Express entry
│  │  ├─ db.js            # Postgres connection
│  │  ├─ routes/          # Enquiries, Members, Choices, Settings, Health
│  │  └─ middleware/      # Error handler, async handler
│  └─ sql/migrations/     # DB migrations
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ components/      # NavBar, AddEnquiryModal, etc.
│  │  └─ pages/           # Home, EnquiriesPage, MembersPage
│  └─ index.css           # Rainbow theme CSS
└─ README.md

📈 Development Workflow

Create a new migration when adding tables/columns:

cd backend
npx node-pg-migrate create add_something --sql-file -m ./sql/migrations


Run migrations:

npm run migrate up


Add backend routes in src/routes/.

Add React components/pages in frontend/src/.

📡 API Reference
Health
GET /api/health


→ { "status": "ok" }

Enquiries
GET /api/enquiries


List all enquiries.

POST /api/enquiries
Content-Type: application/json

{
  "name": "Alice Example",
  "dob": "2018-05-10",
  "status_id": 1
}


Add a new enquiry.

PATCH /api/enquiries/:id/status
Content-Type: application/json

{ "status_id": 2 }


Update status of an enquiry.

POST /api/enquiries/:id/promote


Promote an enquiry → member.

Members
GET /api/members


List all members.

PATCH /api/members/:id/exit
Content-Type: application/json

{ "exit_reason_id": 3 }


Exit a member.

Choices
GET /api/choices/:category


Example:

GET /api/choices/enquiry_status
GET /api/choices/exit_reason

Settings
GET /api/settings


List all settings.

PATCH /api/settings/:key
Content-Type: application/json

{ "value": "6" }


Update a setting.

📜 License

MIT — free to use and adapt.