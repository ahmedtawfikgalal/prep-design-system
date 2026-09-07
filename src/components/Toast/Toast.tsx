import { useEffect } from 'react';
import './Toast.css';

type ToastVariant = 'info' | 'success' | 'error';

type ToastProps = {
  message: React.ReactNode;
  variant?: ToastVariant;
  onClose?: () => void;
  duration?: number;
};

export const Toast = ({
  message,
  variant = 'info',
  onClose,
  duration,
}: ToastProps) => {
  useEffect(() => {
    if (!duration || !onClose) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast toast--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <span className="toast__message">{message}</span>
      {onClose && (
        <button
          type="button"
          className="toast__close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};
