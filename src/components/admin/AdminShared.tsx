import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <motion.div
    className={`admin-toast ${type}`}
    initial={{ opacity: 0, y: 40, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 40, x: '-50%' }}
  >
    {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
    {message}
  </motion.div>
);

export const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div className="empty-state">
    <AlertCircle size={48} />
    <p>{text}</p>
  </div>
);
