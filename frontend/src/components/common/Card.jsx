import { motion } from 'framer-motion';
import './Card.css';

export default function Card({ children, className = '', hoverable = true, style }) {
  return (
    <motion.div
      className={`df-card ${className}`}
      style={style}
      whileHover={hoverable ? { y: -4, boxShadow: 'var(--shadow-lift)' } : {}}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
