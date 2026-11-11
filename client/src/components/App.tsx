import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import { NOTIFICATION_DURATION_MS, NOTIFICATIONS } from '../utils/constants';
import * as mainApi from '../utils/mainApi';
import { getMotorcycleKey } from '../utils/motorcyclesApi';
import { ApiError } from '../utils/request';
import { getToken, removeToken, saveToken } from '../utils/token';
import type {
  GarageItem,
  LoginData,
  ModalName,
  Motorcycle,
  NewGarageItem,
  Notification,
  RegisterData,
  User,
} from '../utils/types';
import About from './About';
import Footer from './Footer';
import Garage from './Garage';
import Header from './Header';
import LoginModal from './LoginModal';
import Main from './Main';
import NotificationToast from './NotificationToast';
import ProtectedRoute from './ProtectedRoute';
import RegisterModal from './RegisterModal';
import SaveMotorcycleModal from './SaveMotorcycleModal';

interface LocationState {
  openSignin?: boolean;
  from?: string;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Solo hay algo que comprobar si quedó un token guardado de una visita anterior
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(() => getToken() !== null);
  const [garageItems, setGarageItems] = useState<GarageItem[]>([]);
  const [isGarageLoading, setIsGarageLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [motorcycleToSave, setMotorcycleToSave] = useState<Motorcycle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [notification, setNotification] = useState<Notification | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = currentUser !== null;

  // Una ruta protegida redirige aquí con este estado: entonces se muestra el inicio de sesión
  const locationState = location.state as LocationState | null;
  const isSigninRequested = Boolean(locationState?.openSignin) && !isLoggedIn;
  const isSigninOpen = activeModal === 'signin' || (activeModal === null && isSigninRequested);
  const contextValue = useMemo(() => ({ currentUser, isLoggedIn }), [currentUser, isLoggedIn]);
  const savedKeys = useMemo(
    () => new Set(garageItems.map((item) => getMotorcycleKey({ ...item, year: String(item.year) }))),
    [garageItems],
  );

  // Al abrir la aplicación: si hay token guardado, GET /users/me restaura la sesión;
  // si el servidor lo rechaza, se borra
  useEffect(() => {
    if (!getToken()) return;
    mainApi
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        loadGarage();
      })
      .catch(() => removeToken())
      .finally(() => setIsCheckingToken(false));
  }, []);

  // Los avisos se ocultan solos después de unos segundos
  useEffect(() => {
    if (!notification) return;
    const timeoutId = setTimeout(() => setNotification(null), NOTIFICATION_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [notification]);

  function showNotification(text: string, isError = false) {
    setNotification({ text, isError });
  }

  function loadGarage() {
    setIsGarageLoading(true);
    mainApi
      .getGarageItems()
      .then(setGarageItems)
      .catch((error: unknown) => showNotification(getErrorMessage(error), true))
      .finally(() => setIsGarageLoading(false));
  }

  function clearSigninRequest() {
    if (locationState?.openSignin) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }

  function openModal(name: ModalName) {
    if (name !== 'signin') clearSigninRequest();
    setFormError('');
    setActiveModal(name);
  }

  function closeModal() {
    clearSigninRequest();
    setActiveModal(null);
    setFormError('');
  }

  // Si el servidor rechaza el token a mitad de la sesión, se cierra la sesión
  function handleApiError(error: unknown) {
    if (error instanceof ApiError && error.status === 401) {
      handleSignout(NOTIFICATIONS.SESSION_EXPIRED);
      return;
    }
    showNotification(getErrorMessage(error), true);
  }

  async function handleRegister(data: RegisterData) {
    setIsSubmitting(true);
    setFormError('');
    try {
      await auth.register(data);
      openModal('signin');
      showNotification(NOTIFICATIONS.REGISTERED);
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogin(data: LoginData) {
    setIsSubmitting(true);
    setFormError('');
    try {
      const { token, user } = await auth.login(data);
      const redirectTo = locationState?.from;
      saveToken(token);
      setCurrentUser(user);
      loadGarage();
      setActiveModal(null);
      setFormError('');
      showNotification(NOTIFICATIONS.SIGNED_IN(user.name));
      // Si venía de una ruta protegida, vuelve a ella; si no, se limpia la petición
      navigate(redirectTo ?? location.pathname, { replace: true, state: null });
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSignout(message: string = NOTIFICATIONS.SIGNED_OUT) {
    removeToken();
    setCurrentUser(null);
    setGarageItems([]);
    navigate('/');
    showNotification(message);
  }

  function handleSaveClick(motorcycle: Motorcycle) {
    if (!isLoggedIn) {
      openModal('signin');
      return;
    }
    setMotorcycleToSave(motorcycle);
    openModal('save');
  }

  async function handleSave(item: NewGarageItem) {
    setIsSubmitting(true);
    setFormError('');
    try {
      const savedItem = await mainApi.addGarageItem(item);
      setGarageItems((items) => [savedItem, ...items]);
      closeModal();
      showNotification(NOTIFICATIONS.SAVED(`${savedItem.make} ${savedItem.model}`));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        closeModal();
        handleApiError(error);
        return;
      }
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(item: GarageItem) {
    setDeletingId(item._id);
    try {
      await mainApi.deleteGarageItem(item._id);
      setGarageItems((items) => items.filter((garageItem) => garageItem._id !== item._id));
      showNotification(NOTIFICATIONS.DELETED(`${item.make} ${item.model}`));
    } catch (error) {
      handleApiError(error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <div className="page">
        <Header onSigninClick={() => openModal('signin')} onSignout={() => handleSignout()} />
        <Routes>
          <Route path="/" element={<Main savedKeys={savedKeys} onSaveClick={handleSaveClick} />} />
          <Route
            path="/garage"
            element={
              <ProtectedRoute isCheckingToken={isCheckingToken}>
                <Garage
                  items={garageItems}
                  isLoading={isGarageLoading}
                  deletingId={deletingId}
                  onDelete={handleDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <LoginModal
          isOpen={isSigninOpen}
          isLoading={isSubmitting}
          errorMessage={formError}
          onClose={closeModal}
          onLogin={handleLogin}
          onSwitchToRegister={() => openModal('signup')}
        />
        <RegisterModal
          isOpen={activeModal === 'signup'}
          isLoading={isSubmitting}
          errorMessage={formError}
          onClose={closeModal}
          onRegister={handleRegister}
          onSwitchToLogin={() => openModal('signin')}
        />
        <SaveMotorcycleModal
          key={motorcycleToSave ? getMotorcycleKey(motorcycleToSave) : 'none'}
          motorcycle={motorcycleToSave}
          isOpen={activeModal === 'save'}
          isLoading={isSubmitting}
          errorMessage={formError}
          onClose={closeModal}
          onSave={handleSave}
        />
        <NotificationToast notification={notification} onClose={() => setNotification(null)} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
