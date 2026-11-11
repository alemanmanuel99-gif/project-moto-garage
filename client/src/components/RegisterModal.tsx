import { useState } from 'react';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../utils/constants';
import type { RegisterData } from '../utils/types';
import FormField from './FormField';
import ModalWithForm from './ModalWithForm';

interface RegisterModalProps {
  isOpen: boolean;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
  onRegister: (data: RegisterData) => void;
  onSwitchToLogin: () => void;
}

function RegisterModal({
  isOpen,
  isLoading,
  errorMessage,
  onClose,
  onRegister,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onRegister({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <ModalWithForm
      title="Crear cuenta"
      name="signup"
      submitText="Registrarse"
      loadingText="Creando cuenta…"
      isOpen={isOpen}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <button className="modal__link" type="button" onClick={onSwitchToLogin}>
            Inicia sesión
          </button>
        </>
      }
    >
      <FormField
        label="Nombre"
        type="text"
        name="name"
        placeholder="Cómo quieres que te llamemos"
        autoComplete="name"
        required
        minLength={NAME_MIN_LENGTH}
        maxLength={NAME_MAX_LENGTH}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FormField
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="tu@correo.com"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormField
        label="Contraseña"
        type="password"
        name="password"
        placeholder={`Al menos ${PASSWORD_MIN_LENGTH} caracteres`}
        autoComplete="new-password"
        required
        minLength={PASSWORD_MIN_LENGTH}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
