export const DEFAULT_PORT = 3001;
export const DEFAULT_CLIENT_ORIGIN = 'http://localhost:5173';
export const MONGO_MAX_POOL_SIZE = 10;

export const SALT_ROUNDS = 10;
export const JWT_EXPIRES_IN = '7d';
export const MIN_PASSWORD_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 30;
export const REVIEW_MAX_LENGTH = 300;
export const RATING_MIN = 1;
export const RATING_MAX = 5;
export const GARAGE_STATUSES = ['want', 'tried', 'own'] as const;

export const SIGNIN_LIMIT = { WINDOW_MS: 15 * 60 * 1000, MAX: 10 } as const;
export const SIGNUP_LIMIT = { WINDOW_MS: 60 * 60 * 1000, MAX: 20 } as const;

export const MESSAGES = {
  SIGNUP_REQUIRED: 'Los campos name, email y password son obligatorios',
  SIGNIN_REQUIRED: 'Los campos email y password son obligatorios',
  CREDENTIALS_TEXT: 'Los campos email y password deben ser texto',
  NAME_LENGTH: `El nombre debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres`,
  PASSWORD_LENGTH: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
  EMAIL_TAKEN: 'Ese correo electrónico ya está registrado',
  INVALID_CREDENTIALS: 'Correo electrónico o contraseña incorrectos',
  AUTH_REQUIRED: 'Se requiere autorización',
  INVALID_TOKEN: 'Token inválido o expirado',
  USER_NOT_FOUND: 'No se encontró el usuario',
  GARAGE_REQUIRED: 'Los campos make, model, year, rating y status son obligatorios',
  GARAGE_INVALID_YEAR: 'El año debe ser un número de cuatro cifras',
  GARAGE_INVALID_RATING: `La calificación debe ser un número entero del ${RATING_MIN} al ${RATING_MAX}`,
  GARAGE_INVALID_STATUS: `El estado debe ser uno de estos: ${GARAGE_STATUSES.join(', ')}`,
  GARAGE_REVIEW_LENGTH: `La reseña no puede tener más de ${REVIEW_MAX_LENGTH} caracteres`,
  GARAGE_DUPLICATE: 'Esa moto ya está en tu garage',
  GARAGE_NOT_FOUND: 'No se encontró esa moto en el garage',
  GARAGE_FORBIDDEN: 'No puedes eliminar una moto del garage de otra persona',
  GARAGE_DELETED: 'Moto eliminada del garage',
  INVALID_ID: 'El identificador no es válido',
  INVALID_JSON: 'El cuerpo de la petición no es un JSON válido',
  ROUTE_NOT_FOUND: 'Recurso solicitado no encontrado',
  SIGNIN_TOO_MANY: 'Demasiados intentos de inicio de sesión. Inténtalo de nuevo más tarde.',
  SIGNUP_TOO_MANY: 'Demasiados registros desde esta dirección. Inténtalo de nuevo más tarde.',
  SERVER_ERROR: 'Ha ocurrido un error en el servidor',
} as const;
