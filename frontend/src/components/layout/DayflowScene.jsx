import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './DayflowScene.css';

const beats = [
  { time: '9:00', label: 'Clock in', copy: 'One tap check-in greets everyone at the door.' },
  { time: '1:30', label: 'Stay aligned', copy: 'Leave, attendance and payroll — one clear view.' },
  { time: '6:00', label: 'Wrap the day', copy: 'Approvals move at the speed of a workday, not a queue.' },
];

export default function DayflowScene() {
  const [beat, setBeat] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sceneRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setBeat((b) => (b + 1) % beats.length), 3400);
    return () => clearInterval(id);
  }, []);

  function handleMouseMove(e) {
    const rect = sceneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  }

  return (
    <div className="df-scene" ref={sceneRef} onMouseMove={handleMouseMove}>
      <motion.div
        className="df-scene__blob df-scene__blob--sky"
        animate={{ x: tilt.x * -18, y: tilt.y * -18 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />
      <motion.div
        className="df-scene__blob df-scene__blob--peach"
        animate={{ x: tilt.x * 24, y: tilt.y * 24 }}
        transition={{ type: 'spring', stiffness: 50, damping: 18 }}
      />
      <motion.div
        className="df-scene__blob df-scene__blob--apricot"
        animate={{ x: tilt.x * -12, y: tilt.y * 30 }}
        transition={{ type: 'spring', stiffness: 40, damping: 16 }}
      />

      <div className="df-scene__arc" />

      <div className="df-scene__copy">
        <span className="df-scene__eyebrow">Every workday, perfectly aligned.</span>
        <h2 className="df-scene__headline">Dayflow</h2>

        <div className="df-scene__beat">
          {beats.map((b, i) => (
            <motion.div
              key={b.label}
              className="df-scene__beat-item"
              initial={false}
              animate={{ opacity: i === beat ? 1 : 0, y: i === beat ? 0 : 8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: i === beat ? 'relative' : 'absolute' }}
            >
              <span className="df-scene__beat-time">{b.time}</span>
              <span className="df-scene__beat-label">{b.label}</span>
              <p>{b.copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="df-scene__dots">
          {beats.map((b, i) => (
            <span key={b.label} className={`df-scene__dot ${i === beat ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
