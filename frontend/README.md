# Dayflow — HRMS Frontend

"Every workday, perfectly aligned." A React frontend for the Dayflow HR Management
System, built from the project's PRD and the sketched database schema (Employ,
Attendances, Requests tables).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
```

Sign in with any password using one of the seeded accounts:
- `aarav.mehta@dayflow.com` — Employee view (dashboard, profile, attendance, leave, salary)
- `r.kapoor@dayflow.com` — HR view (employee list, all-attendance, leave approvals, payroll control)

## Folder structure (clean architecture)

```
src/
  App.jsx              — top-level providers + router
  main.jsx             — React DOM entry point
  context/
    AuthContext.jsx     — signed-in user + role, used by every page via useAuth()
  router/
    AppRouter.jsx        — all routes in one place
    ProtectedRoute.jsx   — redirects to /signin if not authenticated
  services/
    api.js               — EVERY network call lives here (see below)
    mockData.js          — seed data shaped exactly like the DB schema
  styles/
    variables.css         — design tokens: color, type, spacing, motion
    global.css            — reset + base element styles
  components/
    common/               — Button, Card, StatusBadge, Avatar, Modal, FormField
    layout/                — Sidebar, Topbar, DashboardLayout, DayflowScene (hero visual)
  pages/
    auth/                  — SignIn, SignUp
    dashboard/              — Dashboard (role switcher), EmployeeDashboard, AdminDashboard
    profile/                 — Profile (view/edit, role-gated fields)
    attendance/               — Attendance (check-in + records, role-aware)
    leave/                     — Leave (switcher), LeaveRequests (apply), LeaveApproval (HR)
    payroll/                    — Payroll (switcher), EmployeePayroll, AdminPayroll
```

Every page has its own `.jsx` and a matching `.css` file — styling is never
inlined or mixed into markup, so any file can be handed to someone else to
restyle without touching logic.

## Connecting a real backend

Open `src/services/api.js`. Every function already has a commented-out
`fetch(...)` call showing exactly what request to send and where — uncomment
it, remove the mock-data line above it, and set `BASE_URL` at the top of the
file. No page component needs to change, because every page only ever calls
functions from this file (never `fetch`/`axios` directly).

## Database shape this UI assumes

```
Employ         ID, Email, Password, Role (Employee | HR), Salary, Resume, Photo, PersonDetails{...}
Attendances    AttendanceID, Dates, ID (FK → Employ.ID), Status
Requests       ReqID, ID (FK → Employ.ID), Status (Pending|Approved|Rejected), Type (Paid|Unpaid|Sick), Remark
```

## Design system

- Palette (given): `#CFEBFF` dawn sky, `#FFFCE1` morning cream, `#FFDDB0` soft peach, `#FFBE91` warm apricot — used as a single gradient arc representing a workday moving from morning to golden hour. All variables live in `src/styles/variables.css`; change them once to re-theme the whole app.
- Type: Fraunces (display) + Manrope (body/UI).
- Motion: `DayflowScene` on the auth pages is the signature piece — a mouse-parallax gradient scene with rotating storytelling captions ("Clock in" → "Stay aligned" → "Wrap the day"). Elsewhere, motion stays as micro-interactions: card hover-lift, button press, staggered list entrances, animated status changes on leave approval.
- Respects `prefers-reduced-motion`.

## Things intentionally left out (per the PRD's stated scope)

Email/notification alerts and the analytics & reports dashboard are listed
under the PDF's "Future Enhancements" section, not the core functional
requirements — they're not built here. Say the word if you'd like them added.
