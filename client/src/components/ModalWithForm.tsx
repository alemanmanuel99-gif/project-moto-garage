import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import closeIcon from '../images/close.svg';

interface ModalWithFormProps {
  title: string;
  name: string;
  submitText: string;
  loadingText: string;
  isOpen: boolean;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  footer?: ReactNode;
}

function ModalWithForm({
  title,
  name,
  submitText,
  loadingText,
  isOpen,
  isLoading,
  errorMessage,
  onClose,
  onSubmit,
  children,
  footer,
}: ModalWithFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // <dialog> nativo: cierra con Escape, mantiene el foco dentro y bloquea el fondo
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  // Clic en el fondo oscuro: el destino es el propio <dialog>, no su contenido
  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={`${name}-title`}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="modal__content">
        <button className="modal__close" type="button" aria-label="Cerrar" onClick={onClose}>
          <img src={closeIcon} alt="Ícono de cerrar" width="24" height="24" />
        </button>
        <h2 className="modal__title" id={`${name}-title`}>
          {title}
        </h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {errorMessage && (
            <p className="modal__error" role="alert">
              {errorMessage}
            </p>
          )}
          <button className="button modal__submit" type="submit" disabled={isLoading}>
            {isLoading ? loadingText : submitText}
          </button>
        </form>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </dialog>
  );
}

export default ModalWithForm;
