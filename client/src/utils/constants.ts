export const MOTORCYCLES_API_URL = 'https://api.api-ninjas.com/v1/motorcycles';

export const API_NINJAS_URL = 'https://api-ninjas.com';

export const CURRENT_YEAR = new Date().getFullYear();

// Cuántas tarjetas se muestran al principio y con cada "Mostrar más"
export const CARDS_PER_PAGE = 6;

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
