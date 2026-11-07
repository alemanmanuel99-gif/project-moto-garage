import closeIcon from '../images/close.svg';
import errorIcon from '../images/error.svg';
import successIcon from '../images/success.svg';
import type { Notification } from '../utils/types';

interface NotificationToastProps {
  notification: Notification | null;
  onClose: () => void;
}

function NotificationToast({ notification, onClose }: NotificationToastProps) {
  if (!notification) return null;

  return (
    <div
      className={`notification${notification.isError ? ' notification_type_error' : ''}`}
      role={notification.isError ? 'alert' : 'status'}
    >
      <img
        className="notification__icon"
        src={notification.isError ? errorIcon : successIcon}
        alt={notification.isError ? 'Ícono de error' : 'Ícono de éxito'}
        width="24"
        height="24"
      />
      <p className="notification__text">{notification.text}</p>
      <button className="notification__close" type="button" aria-label="Cerrar aviso" onClick={onClose}>
        <img src={closeIcon} alt="Ícono de cerrar" width="20" height="20" />
      </button>
    </div>
  );
}

export default NotificationToast;
