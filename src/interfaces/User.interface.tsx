import {Image} from './Image.interface';
import {FavoritesPlaces, TravelPoint} from './TravelInfo.interface';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  status: boolean;
  role: string;
  name: string;
  lastName: string;
  email?: string;
  phone?: string;
  reciveNotifications: boolean;
  notificationTokens: string[];
  id: string;
  theme: string;
  image: Image;
  favoritesPlaces: FavoritesPlaces[];
  lastTravel: TravelPoint[];
  acceptFastTravel: boolean;
  acceptScheduleTravel: boolean;
  isInTravel?: boolean;
}
