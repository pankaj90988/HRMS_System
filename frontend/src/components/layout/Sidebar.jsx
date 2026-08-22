import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const employeeLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/profile', label: 'Profile', icon: '☺' },
  { to: '/attendance', label: 'Attendance', icon: '◔' },
  { to: '/leave', label: 'Leave Requests', icon: '✉' },
  { to: '/payroll', label: 'Salary', icon: '฿' },
];

const hrLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/profile', label: 'My Profile', icon: '☺' },
  { to: '/attendance', label: 'Attendance Records', icon: '◔' },
  { to: '/leave', label: 'Leave Approvals', icon: '✉' },
  { to: '/payroll', label: 'Payroll Control', icon: '฿' },
];

export default function Sidebar() {
  const { user, isHR, logout } = useAuth();
  const links = isHR ? hrLinks : employeeLinks;

  return (
    <aside className="df-sidebar">
      <div className="df-sidebar__brand">
        <span className="df-sidebar__arc" aria-hidden="true" />
        <span className="df-sidebar__brand-name">Dayflow</span>
      </div>

      <nav className="df-sidebar__nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `df-sidebar__link ${isActive ? 'is-active' : ''}`}
          >
            <span className="df-sidebar__link-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="df-sidebar__footer">
        <div className="df-sidebar__user">
          <div className="df-sidebar__user-name">{user?.PersonDetails?.name}</div>
          <div className="df-sidebar__user-role">{user?.Role}</div>
        </div>
        <button className="df-sidebar__logout" onClick={logout}>
          Log out
        </button>
      </div>
    </aside>
  );
}
