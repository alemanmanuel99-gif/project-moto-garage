export const MOTORCYCLES_API_URL = 'https://api.api-ninjas.com/v1/motorcycles';

export const API_NINJAS_URL = 'https://api-ninjas.com';

export const CURRENT_YEAR = new Date().getFullYear();

// Cuántas tarjetas se muestran al principio y con cada "Mostrar más"
export const CARDS_PER_PAGE = 6;

// Largo mínimo de la búsqueda, contado sin los espacios del principio y del final
export const MIN_QUERY_LENGTH = 2;

export const VALIDATION_MESSAGES = {
  EMPTY_QUERY: 'Escribe una marca o un modelo: la búsqueda no puede estar vacía ni tener solo espacios.',
  SHORT_QUERY: `Escribe al menos ${MIN_QUERY_LENGTH} caracteres para buscar.`,
} as const;

export const SEARCH_FIELD_LABELS = {
  make: 'Marca',
  model: 'Modelo',
} as const;

export const SEARCH_PLACEHOLDERS = {
  make: 'Por ejemplo: Honda, Yamaha, Ducati',
  model: 'Por ejemplo: CB500, MT-07, Monster',
} as const;

export const ERROR_MESSAGES = {
  RATE_LIMIT:
    'Se alcanzó el límite de búsquedas por hora del servicio de datos. Inténtalo de nuevo en un rato.',
  INVALID_KEY:
    'El servicio de datos rechazó la clave de acceso. Revisa la variable VITE_API_NINJAS_KEY.',
  NETWORK:
    'Algo salió mal con la solicitud. Puede ser un problema de conexión o del servidor. Inténtalo de nuevo más tarde.',
  GENERIC:
    'Algo salió mal con la solicitud. Puede ser un problema de conexión o del servidor. Inténtalo de nuevo más tarde.',
} as const;

export const IDLE_MESSAGE = {
  TITLE: 'Empieza tu búsqueda',
  TEXT: 'Escribe una marca o un modelo para ver la ficha técnica de cada moto.',
} as const;

export const SEARCH_ERROR_TITLE = 'No pudimos completar la búsqueda';

export const NOT_FOUND_MESSAGE = {
  TITLE: 'No se encontró nada',
  TEXT: 'Revisa cómo está escrito o prueba con otra marca o modelo.',
} as const;

// --- Tu API (Moto Garage) ---

// Sin barra final, para que las rutas no queden con doble barra
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '');

export const TOKEN_STORAGE_KEY = 'jwt';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 8;
export const REVIEW_MAX_LENGTH = 300;
export const RATING_VALUES = [1, 2, 3, 4, 5] as const;

export const GARAGE_STATUS_LABELS = {
  want: 'La quiero',
  tried: 'La probé',
  own: 'La tengo',
} as const;

export const NOTIFICATION_DURATION_MS = 4000;

export const API_ERROR_MESSAGES = {
  NETWORK: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  GENERIC: 'Algo salió mal con la solicitud. Inténtalo de nuevo más tarde.',
} as const;

export const NOTIFICATIONS = {
  REGISTERED: '¡Registro exitoso! Ahora inicia sesión con tu correo y tu contraseña.',
  SIGNED_IN: (name: string) => `Hola, ${name}. Ya puedes guardar motos en tu garage.`,
  SIGNED_OUT: 'Cerraste sesión. ¡Vuelve pronto!',
  SAVED: (title: string) => `Se guardó ${title} en tu garage.`,
  DELETED: (title: string) => `Se eliminó ${title} de tu garage.`,
  SESSION_EXPIRED: 'Tu sesión expiró. Inicia sesión de nuevo.',
} as const;

export const GARAGE_MESSAGES = {
  EMPTY_TITLE: 'Tu garage está vacío',
  EMPTY_TEXT: 'Busca una moto y usa «Guardar en mi garage» para tenerla aquí con tu calificación y tu reseña.',
  LOADING: 'Cargando tu garage…',
} as const;
