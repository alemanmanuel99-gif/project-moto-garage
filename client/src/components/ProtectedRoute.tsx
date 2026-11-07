import { useContext } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

interface ProtectedRouteProps {
  isCheckingToken: boolean;
  children: ReactNode;
}

// Quien no inició sesión vuelve al inicio con el formulario de inicio de sesión abierto
function ProtectedRoute({ isCheckingToken, children }: ProtectedRouteProps) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();

  if (isCheckingToken) {
    return (
      <main className="content">
        <Preloader text="Comprobando tu sesión…" />
      </main>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ openSignin: true, from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
