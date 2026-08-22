/*
  API SERVICE LAYER
  ------------------
  Every page calls functions from here — never fetch()/axios directly
  inside a component. That keeps the swap from mock data to a real
  backend to ONE file.

  HOW TO CONNECT A REAL BACKEND:
  1. Set BASE_URL below to your server, e.g. "https://api.dayflow.app"
  2. Inside each function, replace the `mock...()` call with the
     commented `fetch(...)` example already written next to it.
  3. Keep the function names & return shapes the same so no page
     component needs to change.
*/

import { employees, attendances, requests } from './mockData';

export const BASE_URL = 'https://api.dayflow.app'; // <-- change to your real backend

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/* ---------------------------- AUTH ---------------------------- */

export async function signIn({ email, password }) {
  await delay();
  // Real backend:
  // const res = await fetch(`${BASE_URL}/auth/signin`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!res.ok) throw new Error('Invalid credentials');
  // return res.json();

  const user = employees.find((e) => e.Email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('No account found with that email.');
  return user;
}

export async function signUp({ ID, email, password, role }) {
  await delay();
  // Real backend:
  // const res = await fetch(`${BASE_URL}/auth/signup`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ ID, email, password, role }),
  // });
  // return res.json();

  const newUser = {
    ID: ID || `EMP-${Math.floor(100 + Math.random() * 900)}`,
    Email: email,
    Password: '••••••••',
    Role: role,
    Salary: 0,
    Resume: null,
    Photo: null,
    PersonDetails: { name: email.split('@')[0], designation: '', department: '', phone: '', address: '', joined: new Date().toISOString().slice(0, 10) },
  };
  employees.push(newUser);
  return newUser;
}

/* -------------------------- EMPLOYEES -------------------------- */

export async function getAllEmployees() {
  await delay();
  // fetch(`${BASE_URL}/employees`).then(r => r.json())
  return employees;
}

export async function getEmployeeById(ID) {
  await delay(200);
  // fetch(`${BASE_URL}/employees/${ID}`).then(r => r.json())
  return employees.find((e) => e.ID === ID);
}

export async function updateEmployee(ID, patch) {
  await delay();
  // fetch(`${BASE_URL}/employees/${ID}`, { method: 'PATCH', body: JSON.stringify(patch) })
  const idx = employees.findIndex((e) => e.ID === ID);
  if (idx === -1) throw new Error('Employee not found');
  employees[idx] = { ...employees[idx], ...patch, PersonDetails: { ...employees[idx].PersonDetails, ...(patch.PersonDetails || {}) } };
  return employees[idx];
}

/* -------------------------- ATTENDANCE -------------------------- */

export async function getAttendanceForEmployee(ID) {
  await delay();
  // fetch(`${BASE_URL}/attendance?employeeId=${ID}`).then(r => r.json())
  return attendances.filter((a) => a.ID === ID).sort((a, b) => (a.Dates < b.Dates ? 1 : -1));
}

export async function getAllAttendance() {
  await delay();
  // fetch(`${BASE_URL}/attendance`).then(r => r.json())
  return attendances;
}

export async function checkIn(ID) {
  await delay(300);
  // fetch(`${BASE_URL}/attendance/check-in`, { method: 'POST', body: JSON.stringify({ ID }) })
  const today = new Date().toISOString().slice(0, 10);
  const existing = attendances.find((a) => a.ID === ID && a.Dates === today);
  if (existing) return existing;
  const record = { AttendanceID: `ATT-${Date.now()}`, Dates: today, ID, Status: 'Present' };
  attendances.unshift(record);
  return record;
}

/* --------------------- LEAVE / TIME-OFF REQUESTS --------------------- */

export async function getRequestsForEmployee(ID) {
  await delay();
  // fetch(`${BASE_URL}/requests?employeeId=${ID}`).then(r => r.json())
  return requests.filter((r) => r.ID === ID);
}

export async function getAllRequests() {
  await delay();
  // fetch(`${BASE_URL}/requests`).then(r => r.json())
  return requests;
}

export async function createRequest({ ID, Type, Remark, range }) {
  await delay();
  // fetch(`${BASE_URL}/requests`, { method: 'POST', body: JSON.stringify({ ID, Type, Remark, range }) })
  const record = { ReqID: `REQ-${Date.now()}`, ID, Status: 'Pending', Type, Remark, range };
  requests.unshift(record);
  return record;
}

export async function updateRequestStatus(ReqID, Status) {
  await delay(250);
  // fetch(`${BASE_URL}/requests/${ReqID}`, { method: 'PATCH', body: JSON.stringify({ Status }) })
  const idx = requests.findIndex((r) => r.ReqID === ReqID);
  if (idx === -1) throw new Error('Request not found');
  requests[idx] = { ...requests[idx], Status };
  return requests[idx];
}

/* ------------------------------ PAYROLL ------------------------------ */

export async function getPayroll(ID) {
  await delay();
  // fetch(`${BASE_URL}/payroll/${ID}`).then(r => r.json())
  const emp = employees.find((e) => e.ID === ID);
  if (!emp) throw new Error('Employee not found');
  return { ID: emp.ID, name: emp.PersonDetails.name, salary: emp.Salary };
}

export async function updateSalary(ID, salary) {
  await delay();
  // fetch(`${BASE_URL}/payroll/${ID}`, { method: 'PATCH', body: JSON.stringify({ salary }) })
  return updateEmployee(ID, { Salary: salary });
}
