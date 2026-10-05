import React from 'react'
import { m, AnimatePresence } from 'framer-motion';
import { useDialog } from '@/hooks/useDialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, label }) => {
  const dialogRef = useDialog(isOpen, onClose);
  return (
    <AnimatePresence
      onExitComplete={() => onClose()}
    >
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="bg-transparent w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default Modal