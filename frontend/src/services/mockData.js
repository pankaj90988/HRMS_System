/*
  MOCK DATA — mirrors the database schema exactly as sketched in the
  project's ER diagrams, so swapping this file's contents for real
  API responses later requires no shape changes elsewhere in the app.

  Table: Employ
    ID, Email, Password, Role (Employee | HR), Salary (all allowances in hand),
    Resume, Photo/UserImage, PersonDetails

  Table: Attendances
    AttendanceID, Dates, ID (FK -> Employ.ID), Status

  Table: Requests   (leave / time-off requests)
    ReqID, ID (FK -> Employ.ID), Status (Pending | Approved | Rejected),
    Type (Paid | Unpaid | Sick), Remark
*/

export const employees = [
  {
    ID: 'EMP-101',
    Email: 'aarav.mehta@dayflow.com',
    Password: '••••••••',
    Role: 'Employee',
    Salary: 62000,
    Resume: 'aarav_mehta_resume.pdf',
    Photo: null,
    PersonDetails: {
      name: 'Aarav Mehta',
      designation: 'Frontend Engineer',
      department: 'Product Engineering',
      phone: '+91 98765 43210',
      address: 'Bihta, Patna, Bihar',
      joined: '2024-03-11',
    },
  },
  {
    ID: 'EMP-102',
    Email: 'sana.iyer@dayflow.com',
    Password: '••••••••',
    Role: 'Employee',
    Salary: 58000,
    Resume: 'sana_iyer_resume.pdf',
    Photo: null,
    PersonDetails: {
      name: 'Sana Iyer',
      designation: 'UX Designer',
      department: 'Design',
      phone: '+91 91234 56780',
      address: 'Kankarbagh, Patna, Bihar',
      joined: '2023-11-02',
    },
  },
  {
    ID: 'HR-001',
    Email: 'r.kapoor@dayflow.com',
    Password: '••••••••',
    Role: 'HR',
    Salary: 74000,
    Resume: 'r_kapoor_resume.pdf',
    Photo: null,
    PersonDetails: {
      name: 'Riya Kapoor',
      designation: 'HR Officer',
      department: 'Human Resources',
      phone: '+91 99887 66554',
      address: 'Boring Road, Patna, Bihar',
      joined: '2022-06-20',
    },
  },
];

export const attendances = [
  { AttendanceID: 'ATT-9001', Dates: '2026-08-18', ID: 'EMP-101', Status: 'Present' },
  { AttendanceID: 'ATT-9002', Dates: '2026-08-19', ID: 'EMP-101', Status: 'Present' },
  { AttendanceID: 'ATT-9003', Dates: '2026-08-20', ID: 'EMP-101', Status: 'Half-day' },
  { AttendanceID: 'ATT-9004', Dates: '2026-08-21', ID: 'EMP-101', Status: 'Leave' },
  { AttendanceID: 'ATT-9005', Dates: '2026-08-22', ID: 'EMP-101', Status: 'Present' },
  { AttendanceID: 'ATT-9101', Dates: '2026-08-18', ID: 'EMP-102', Status: 'Present' },
  { AttendanceID: 'ATT-9102', Dates: '2026-08-19', ID: 'EMP-102', Status: 'Absent' },
  { AttendanceID: 'ATT-9103', Dates: '2026-08-20', ID: 'EMP-102', Status: 'Present' },
  { AttendanceID: 'ATT-9104', Dates: '2026-08-21', ID: 'EMP-102', Status: 'Present' },
  { AttendanceID: 'ATT-9105', Dates: '2026-08-22', ID: 'EMP-102', Status: 'Present' },
];

export const requests = [
  {
    ReqID: 'REQ-501',
    ID: 'EMP-101',
    Status: 'Pending',
    Type: 'Sick',
    Remark: 'Fever, need two days rest.',
    range: '2026-08-24 to 2026-08-25',
  },
  {
    ReqID: 'REQ-502',
    ID: 'EMP-102',
    Status: 'Approved',
    Type: 'Paid',
    Remark: 'Family function out of town.',
    range: '2026-08-10 to 2026-08-12',
  },
  {
    ReqID: 'REQ-503',
    ID: 'EMP-101',
    Status: 'Rejected',
    Type: 'Unpaid',
    Remark: 'Personal travel.',
    range: '2026-07-28 to 2026-07-29',
  },
];
