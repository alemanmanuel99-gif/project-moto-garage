import { createContext } from 'react';
import type { User } from '../utils/types';

export interface CurrentUserContextValue {
  currentUser: User | null;
  isLoggedIn: boolean;
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
  isLoggedIn: false,
});

export default CurrentUserContext;
