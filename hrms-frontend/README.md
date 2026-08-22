# HRMS — Backend + Frontend

Two separate apps, run them in two terminals.

## Backend (`/backend`)

```bash
cd backend
npm install
npm run dev        # nodemon, or: npm start
```

Runs on `http://localhost:8080`. Reads config from `backend/.env` (already
filled in with the Mongo URI / JWT secret you gave me — **rotate that DB
password since it was shared in plain text**, and never commit `.env` to a
public repo. `backend/.env.example` is the safe template).

Routes:
- `POST /api/auth/signup` `/login` `/logout`, `GET /api/auth/check`
- `GET  /api/personalDetail/AllEmployees` (HR)
- `POST /api/personalDetail/EmployeeList` (HR)
- `POST /api/personalDetail/ViewEmployee`
- `POST /api/personalDetail/EditEmployee`
- `POST /api/personalDetail/AddAttendenceByEmployee`
- `POST /api/personalDetail/UpdateAttendenceByEmployee` (HR)
- **Leaves (new):**
  - `POST  /api/leave/apply` — employee submits a leave request to HR
  - `GET   /api/leave/my` — logged-in user's own leave history
  - `GET   /api/leave/all?status=Pending|Approved|Rejected` — HR only, review queue
  - `PATCH /api/leave/review/:id` — HR approves/rejects `{ status: "Approved" | "Rejected" }`

All routes except signup/login/logout require the `jwt` cookie (set
automatically on login). HR-only routes are protected by an `hrOnly`
middleware — I added this since the routes previously trusted whatever
`email`/`employeeId` the client sent in the request body, which meant anyone
could impersonate HR. Now the server reads the logged-in user's identity from
the verified cookie.

## Frontend (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` (Vite + React + Tailwind, kept minimal on
purpose — no design libraries, just Tailwind utility classes). Talks to the
backend via `frontend/.env` → `VITE_API_URL=http://localhost:8080/api`.

Pages: Login, Signup, Dashboard, Employees (HR list + per-employee
view/edit), Attendance (add/update), and **Leaves** — apply for leave
(Sick/Casual/Paid/Other), see your own leave history, and — if logged in as
HR — a Pending/Approved/Rejected/All queue with one-click Approve/Reject on
every employee's request.

## Notes
- First account needs to sign up with role `HR` to unlock the HR-only pages.
- "Employee ID" fields (e.g. in Attendance) expect a Mongo `_id` — grab one
  from the Employees list page.
