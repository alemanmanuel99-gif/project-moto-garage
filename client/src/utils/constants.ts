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
    'No se pudo conectar con el servicio de datos. Revisa tu conexión e inténtalo de nuevo.',
  GENERIC: 'Algo salió mal al buscar motocicletas. Inténtalo de nuevo.',
} as const;
