import errorIcon from '../images/error.svg';
import searchIcon from '../images/search-gray.svg';

interface StatusMessageProps {
  title: string;
  text: string;
  isError?: boolean;
}

function StatusMessage({ title, text, isError = false }: StatusMessageProps) {
  return (
    <div
      className={`status-message${isError ? ' status-message_type_error' : ''}`}
      role={isError ? 'alert' : 'status'}
    >
      <img
        className="status-message__icon"
        src={isError ? errorIcon : searchIcon}
        alt=""
        width="48"
        height="48"
      />
      <h2 className="status-message__title">{title}</h2>
      <p className="status-message__text">{text}</p>
    </div>
  );
}

export default StatusMessage;
