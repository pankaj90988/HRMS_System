import './Avatar.css';

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({ name, photo, size = 44 }) {
  return (
    <div className="df-avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {photo ? <img src={photo} alt={name} /> : <span>{initials(name)}</span>}
    </div>
  );
}
