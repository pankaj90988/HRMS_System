import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './DashboardLayout.css';

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="df-layout">
      <Sidebar />
      <div className="df-layout__main">
        <Topbar title={title} subtitle={subtitle} />
        <main className="df-layout__content">{children}</main>
      </div>
    </div>
  );
}
