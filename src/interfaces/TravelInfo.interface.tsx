export interface DataTravel {
  from: TravelPoint;
  to: TravelPoint;
}
export interface Location {
  latitude: number;
  longitude: number;
}
export interface TravelPoint {
  name: string;
  address: string;
  coordinates: Location;
}

export interface HistoryTravel {
  from: TravelPoint;
  to: TravelPoint;
  createdAt: string;
  cost: number;
}
export interface FavoritesPlaces {
  name: string;
  place: TravelPoint;
}

export interface TravelOffer {
  id: string;
  driver?: string;
  cost: number;
  date: Date;
  fromLocation: TravelPointDB;
  toLocation: TravelPointDB;
  type: TravelType;
  status: boolean;
  user: string;
  state?: TravelState;
  createdAt?: Date;
  updatedAt?: Date;
  payment: TravelPayment;
}
export interface TravelPayment {
  type: 'cash' | 'transfer';
  currency: 'MLC' | 'MN' | 'USD';
}

export interface TravelPointDB {
  type: string;
  travelPoint: TravelPoint;
}
export type TravelType = 'fast' | 'schedule' | 'shared' | 'shared-schedule';
export type TravelState = 'order' | 'taked' | 'cancelled' | 'completed';

export interface TravelOfferResp {
  count: number;
  page: number;
  totalPages: number;
  data: TravelOffer[];
}
