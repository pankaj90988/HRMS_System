# HR Portal — Frontend

Simple React + Tailwind CSS frontend for the Express/MongoDB HR backend
(auth + personal-detail/attendance routes).

## Setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Connecting to the backend

Set the backend URL in `.env` (already created):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Make sure your backend's `cors()` config allows this origin with credentials,
e.g. in `server.js`:

```js
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
```

This is required because the frontend sends `withCredentials: true` so the
`jwt` httpOnly cookie set by `/api/auth/login` is stored and sent back on
every request.

## What's included

- **Signup / Login / Logout** — `/api/auth/*`
- **HR dashboard** — search employees by ID(s) (`EmployeeList`), view, edit
  all fields, add/update attendance for any employee.
- **Employee dashboard** — view own profile (`ViewEmployee`), edit own
  address/phone/profile link, add own attendance.
- Session is kept client-side via `localStorage` (the backend has no `/me`
  route), while the real auth is enforced server-side via the `jwt` cookie.

## Notes on backend behavior this UI relies on

- `EmployeeList` requires the HR's own email plus an array of target
  `employeeIds` — there's no "list all users" route, so HR must know/enter
  employee IDs to search.
- `EditEmployee` lets HR update all personal-detail fields; a non-HR caller
  can only update `address`, `phone`, and `profileLink` on their own record.
- `UpdateAttendenceByEmployee` is HR-only (updates an existing record for a
  given date); `AddAttendenceByEmployee` can be called by anyone for
  themselves and fails with 409 if a record for that date already exists.
