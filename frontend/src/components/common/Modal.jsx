import { AnimatePresence, motion } from 'framer-motion';
import './Modal.css';

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="df-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="df-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="df-modal__header">
              <h3>{title}</h3>
              <button className="df-modal__close" onClick={onClose} aria-label="Close dialog">
                ×
              </button>
            </div>
            <div className="df-modal__body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
