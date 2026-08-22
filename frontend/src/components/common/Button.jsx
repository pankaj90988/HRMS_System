import { motion } from 'framer-motion';
import './Button.css';

/**
 * Shared button. variant: 'primary' | 'ghost' | 'danger'
 */
export default function Button({ children, variant = 'primary', type = 'button', onClick, disabled, full, icon }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`df-btn df-btn--${variant} ${full ? 'df-btn--full' : ''}`}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      {icon && <span className="df-btn__icon">{icon}</span>}
      {children}
    </motion.button>
  );
}
