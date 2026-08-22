# HRMS

A simple HR Management System built with the MERN stack. There are two roles, HR and Employee, each with a different level of access.

## Tech Stack

Backend: Node.js, Express, MongoDB (Mongoose), JWT authentication, bcryptjs for password hashing

Frontend: React, Vite, Tailwind CSS, Axios, react-hot-toast

## Project Structure

```
backend/
  src/
    controllers/
      auth.controller.js
      employee.controller.js
      leave.controller.js
    models/
      user.model.js
      personaldeatail.model.js
      attendenceDetails.model.js
      leave.model.js
    routes/
      auth.routes.js
      personalDetails.routes.js
      leave.routes.js
    middleware/
      protectRoute.js
    lib/
      db.js
      utils.js
    server.js
  package.json
  .env

frontend/
  src/
    pages/
      Login.jsx
      Signup.jsx
      Dashboard.jsx
      EmployeeList.jsx
      ViewEmployee.jsx
      Attendance.jsx
      Leaves.jsx
    components/
      Navbar.jsx
      ProtectedRoute.jsx
    context/
      AuthContext.jsx
    lib/
      axios.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  tailwind.config.js
  postcss.config.js
  vite.config.js
  .env
```

## Setup

### Backend

Create a `.env` file in the backend folder:

```
DB_URI=your-mongodb-connection-string
PORT=8080
JWT_SECRET=a-long-random-secret
NODE_ENV=development
```

Then run:

```
cd backend
npm install
npm run dev
```

The server starts on `http://localhost:8080`.

### Frontend

Create a `.env` file in the frontend folder:

```
VITE_API_URL=http://localhost:8080/api
```

Then run:

```
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

## Authentication

Login sets a JWT in an httpOnly cookie named `jwt`, so it cannot be read or modified from JavaScript in the browser. Every backend route except signup, login, and logout requires this cookie. A `protectRoute` middleware verifies the cookie and attaches the logged-in user to `req.user`. Routes limited to HR are further wrapped with an `hrOnly` middleware that checks the user's role from the database, not from anything the client sends, so this cannot be bypassed by calling the API directly.

On the frontend, `AuthContext` calls the backend's `/auth/check` endpoint on load to restore the session after a page refresh, and `ProtectedRoute` redirects users away from pages they should not see, including HR-only pages.

## Features and Pages

- **Signup and Login**: create an account with a chosen role, HR or Employee, and log in.
- **Dashboard**: shows the logged-in user's salary and allowances, and links to the other sections. HR also sees a link to the Employees page.
- **Employees** (HR only): a list of all employees, linking to each one's profile.
- **View/Edit Employee**: HR can view and edit any employee's full record, including salary and allowances. An employee viewing their own profile sees salary and allowances as read-only, and can edit their own address, phone, and profile link.
- **Attendance**: employees mark their own attendance for a date. HR can add or update attendance for any employee.
- **Leaves**: employees apply for leave (Sick, Casual, Paid, or Other) and can see their own leave history. HR sees every employee's leave requests, filterable by Pending, Approved, Rejected, or All, and can approve or reject a request directly from the list.

## API Reference

### Auth (`/api/auth`)

| Method | Route   | Description                        | Access    |
|--------|---------|-------------------------------------|-----------|
| POST   | /signup | Create a new account                | Public    |
| POST   | /login  | Log in and receive a session cookie | Public    |
| POST   | /logout | Clear the session cookie            | Logged in |
| GET    | /check  | Return the current logged-in user   | Logged in |

### Personal Details and Attendance (`/api/personalDetail`)

| Method | Route                       | Description                                        | Access                                       |
|--------|------------------------------|------------------------------------------------------|-----------------------------------------------|
| GET    | /AllEmployees                | List all employees with personal details              | HR only                                       |
| POST   | /EmployeeList                 | Fetch personal details for a list of employee IDs     | HR only                                       |
| POST   | /ViewEmployee                 | Fetch personal details for one employee                | HR, or the employee themselves                 |
| POST   | /EditEmployee                 | Update personal details                                 | HR (any employee), or self (limited fields)     |
| POST   | /AddAttendenceByEmployee      | Add an attendance record                                 | Any logged-in user for themselves, or HR for anyone |
| POST   | /UpdateAttendenceByEmployee   | Update an existing attendance record                     | HR only                                       |

### Leaves (`/api/leave`)

| Method | Route       | Description                                                                        | Access    |
|--------|-------------|--------------------------------------------------------------------------------------|-----------|
| POST   | /apply      | Submit a leave request                                                                | Logged in |
| GET    | /my         | View the logged-in user's own leave history                                           | Logged in |
| GET    | /all        | View all leave requests, optionally filtered with `?status=Pending`, `Approved`, or `Rejected` | HR only   |
| PATCH  | /review/:id | Approve or reject a leave request, with body `{ status, reviewNote }`                 | HR only   |

## Data Models

**User**: email, password (hashed), role (HR or EMPLOYEE)

**PersonalDetail**: linked to a user, includes address, phone, profile link, ID card link, resume link, salary, and allowances

**AttendenceDetail**: linked to a user, includes date and status

**Leave**: linked to a user, includes leave type, from date, to date, reason, status, and the HR user who reviewed it

## Notes

- A `PersonalDetail` record is created automatically for every new user at signup.
- Passwords are never returned in any API response.
- The first account created should use the HR role to be able to test HR-only features such as the employee list and leave approvals.
