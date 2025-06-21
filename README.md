# SaaS Task Manager

A full-stack SaaS Task Management System built with the MERN stack, Tailwind CSS, and daisyUI. Users can register, log in, manage tasks, receive email reminders, and update their profiles. Data is stored in MongoDB.

## Features
- User registration and authentication (JWT)
- Secure password hashing
- Task CRUD (Create, Read, Update, Delete)
- User-specific tasks
- Email notifications for tasks due soon (via cron job)
- Email subscription management
- Profile management (update name, password)
- Responsive UI with Tailwind CSS and daisyUI

## Tech Stack
- **Frontend:** React, Tailwind CSS, daisyUI, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, node-cron

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/saas-task-manager.git
cd saas-task-manager
```

#### 2. Install backend dependencies
```bash
cd backend
npm install
```

#### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

#### 4. Set up environment variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/taskmanager
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### 5. Start the backend server
```bash
cd ../backend
npm start
```

#### 6. Start the frontend development server
```bash
cd ../frontend
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Usage
- Register a new account or log in.
- Add, edit, and delete your tasks.
- Subscribe to email notifications from the dashboard.
- Receive reminders for tasks due within 24 hours.
- Update your profile information from the Profile page.

## Email Notifications
- Uses Nodemailer to send reminders for tasks due soon.
- Requires a valid email and app password (see Gmail App Passwords).
- Cron job runs every hour to check for upcoming tasks.

## Folder Structure
```
SaaS based Task Manager/
  backend/
    controllers/
    models/
    routes/
    middleware/
    utils/
    data/ (legacy, not used with MongoDB)
    server.js
    ...
  frontend/
    src/
      components/
      pages/
      context/
      services/
      ...
    ...
```

## License
MIT

---

**Contributions welcome!** 