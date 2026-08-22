import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import './Topbar.css';

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth();

  return (
    <header className="df-topbar">
      <div>
        <h1 className="df-topbar__title">{title}</h1>
        {subtitle && <p className="df-topbar__subtitle">{subtitle}</p>}
      </div>
      <div className="df-topbar__user">
        <Avatar name={user?.PersonDetails?.name} photo={user?.Photo} />
      </div>
    </header>
  );
}
