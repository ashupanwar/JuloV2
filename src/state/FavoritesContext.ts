import { createContext } from 'react';
import { FavoritesContextType } from '../common/interfaces';

export const FavoritesContext = createContext<FavoritesContextType | null>(null);