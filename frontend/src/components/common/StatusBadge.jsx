import './StatusBadge.css';

// Maps every status word used across Attendance + Requests tables to a tone.
const TONE_MAP = {
  Present: 'approved',
  Approved: 'approved',
  Absent: 'rejected',
  Rejected: 'rejected',
  Pending: 'pending',
  'Half-day': 'pending',
  Leave: 'leave',
};

export default function StatusBadge({ status }) {
  const tone = TONE_MAP[status] || 'pending';
  return <span className={`df-badge df-badge--${tone}`}>{status}</span>;
}
