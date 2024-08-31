import {Location, TravelOffer} from '../../interfaces/TravelInfo.interface';

export interface TravelState {
  userLocation: Location;
  isLoadingSearch: boolean;
  listFastIsLoaded: boolean;
  listScheduleIsLoaded: boolean;
  travelOffer: Partial<TravelOffer>;
  listTravelFast: TravelOffer[];
  listTravelSchedule: TravelOffer[];
}

type TravelAction =
  | {type: 'set_user_location'; payload: Location}
  | {type: 'set_isloading_search'; payload: boolean}
  | {type: 'set_travel_offer'; payload: {travel: Partial<TravelOffer>}}
  | {type: 'add_travel_fast_by_socket'; payload: {travel: TravelOffer}}
  | {
      type: 'add_travel_schedule_by_socket';
      payload: {travel: TravelOffer};
    }
  | {type: 'set_travel_offer_list'; payload: {travels: TravelOffer[]}}
  | {
      type: 'set_travel_offer_list_schedule';
      payload: {travels: TravelOffer[]};
    };

export const travelReducer = (
  state: TravelState,
  action: TravelAction,
): TravelState => {
  switch (action.type) {
    case 'set_user_location':
      return {
        ...state,
        userLocation: action.payload,
      };
    case 'set_isloading_search':
      return {
        ...state,
        isLoadingSearch: action.payload,
      };
    case 'set_travel_offer':
      return {
        ...state,
        travelOffer: action.payload.travel,
      };
    case 'add_travel_fast_by_socket':
      return {
        ...state,
        listTravelFast: [action.payload.travel, ...state.listTravelFast],
      };
    case 'add_travel_schedule_by_socket':
      return {
        ...state,
        listTravelSchedule: [
          action.payload.travel,
          ...state.listTravelSchedule,
        ],
      };
    case 'set_travel_offer_list':
      return {
        ...state,
        listTravelFast: action.payload.travels,
        listFastIsLoaded: true,
      };
    case 'set_travel_offer_list_schedule':
      return {
        ...state,
        listTravelSchedule: action.payload.travels,
        listScheduleIsLoaded: true,
      };
    default:
      return state;
  }
};
