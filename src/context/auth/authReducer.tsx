import {Card} from '../../interfaces/Card.interface';
import {User} from '../../interfaces/User.interface';

export interface AuthState {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'login';
  user: User | null;
  savedCards: Card[];
  loadingConnect: boolean;
}

type AuthAction =
  | {type: 'notAuthenticated'}
  | {type: 'notInternet'}
  | {type: 'logout'}
  | {type: 'login'; payload: {user: User}}
  | {type: 'updateUser'; payload: {user: User}}
  | {type: 'updateReciveNotifications'; payload: User}
  | {type: 'updateUserFavoritePlace'; payload: {user: User}}
  | {type: 'driverConnectFast'; payload: {acceptFastTravel: boolean}}
  | {type: 'setLoadingConnect'; payload: {loadingConnect: boolean}}
  | {type: 'setCard'; payload: {card: Card}};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'notInternet':
      return {
        ...state,
        status: 'not-internet',
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
      };
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
      };
    case 'updateUser':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'driverConnectFast':
      return {
        ...state,
        user: {
          ...state.user!,
          acceptFastTravel: action.payload.acceptFastTravel,
        },
      };

    case 'setLoadingConnect':
      return {
        ...state,
        loadingConnect: action.payload.loadingConnect,
      };

    case 'updateReciveNotifications':
      return {
        ...state,
        user: action.payload,
      };
    case 'setCard':
      return {
        ...state,
        savedCards: [...state.savedCards, action.payload.card],
      };
    case 'updateUserFavoritePlace':
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
