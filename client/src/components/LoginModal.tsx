import { useState } from 'react';
import type { LoginData } from '../utils/types';
import FormField from './FormField';
import ModalWithForm from './ModalWithForm';

interface LoginModalProps {
  isOpen: boolean;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
  onLogin: (data: LoginData) => void;
  onSwitchToRegister: () => void;
}

function LoginModal({
  isOpen,
  isLoading,
  errorMessage,
  onClose,
  onLogin,
  onSwitchToRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin({ email: email.trim(), password });
  }

  return (
    <ModalWithForm
      title="Iniciar sesión"
      name="signin"
      submitText="Iniciar sesión"
      loadingText="Entrando…"
      isOpen={isOpen}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <>
          ¿Aún no tienes cuenta?{' '}
          <button className="modal__link" type="button" onClick={onSwitchToRegister}>
            Regístrate
          </button>
        </>
      }
    >
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
        placeholder="Tu contraseña"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
