# LMS – My Courses Module

A full-stack Learning Management System (LMS) module developed using the MERN stack as part of a take-home assignment.

The application allows authenticated students to log in, view their enrolled courses, access detailed course information, track study material progress, and view assignments, live sessions, and faculty details.

---

### Users
amal@gmail.com
123456

sreelakshmi@gmail.com
123456

abhilash@gmail.com
123456

## Tech Stack

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based Authentication

---

## Features

### Authentication

- Secure login using JWT
- HTTP-only cookie authentication
- Protected routes
- Session validation

### My Courses

- View enrolled courses
- Progress percentage
- Classroom assignment status

### Course Details

- Course information
- Faculty information
- Modules
- Study materials
- Material completion status
- Assignments
- Live sessions

### Study Material Progress

- Mark materials as completed
- Mark materials as incomplete
- Automatic progress calculation

---

## Database Models

- User
- Course
- Enrollment
- Module
- StudyMaterial
- MaterialProgress
- Faculty
- Assignment
- LiveSession

---

## API Endpoints

### Authentication

POST `/api/auth/login`

POST `/api/auth/logout`

GET `/api/auth/check`

---

### Courses

GET `/api/user/courses`

Returns all courses enrolled by the logged-in student.

GET `/api/user/courses/:courseId`

Returns complete course details including modules, study materials, assignments, live sessions, faculty, and progress.

PATCH `/api/user/materials/:materialId/toggle`

Toggles study material completion status.

---

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

## Sample Login

Use one of the seeded users.

Example:

```
Email: amal@example.com
Password: password123
```

---

## Project Structure

```
client/
    src/
        components/
        mycomponents/
        router/
        auth.store.js
        auth.api.js

server/
    src/
        controllers/
        models/
        routes/
        middlewares/
        utils/
```

---

## Future Improvements

- Assignment submission
- Course search
- Notifications
- Pagination
- File uploads
- Role-based dashboard
- Certificate generation

---
