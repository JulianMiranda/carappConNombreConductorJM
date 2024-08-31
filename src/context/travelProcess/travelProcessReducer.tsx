import {TravelOffer} from '../../interfaces/TravelInfo.interface';

export interface TravelProcessState {
  currentTravel: TravelOffer | null;
  isLoading: boolean;
  error: string | null;
  userInTravel: boolean;
}

type TravelProcessAction =
  | {type: 'set_current_travel'; payload: TravelOffer}
  | {type: 'clear_current_travel'}
  | {type: 'set_isLoading'; payload: boolean}
  | {type: 'setUserInTravel'; payload: {isInTravel: boolean}}
  | {type: 'set_error'; payload: string | null};

export const travelProcessReducer = (
  state: TravelProcessState,
  action: TravelProcessAction,
): TravelProcessState => {
  switch (action.type) {
    case 'set_current_travel':
      return {
        ...state,
        currentTravel: action.payload,
        isLoading: false,
        error: null,
      };
    case 'clear_current_travel':
      return {
        ...state,
        currentTravel: null,
        userInTravel: false,
      };
    case 'setUserInTravel':
      return {
        ...state,
        userInTravel: action.payload.isInTravel,
      };
    case 'set_isLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'set_error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
