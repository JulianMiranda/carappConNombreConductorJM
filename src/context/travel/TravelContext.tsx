import React, {createContext, useEffect, useReducer} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {TravelState, travelReducer} from './travelReducer';
import {
  Location,
  TravelOffer,
  TravelOfferResp,
} from '../../interfaces/TravelInfo.interface';
import api from '../../api/api';

type TravelContextProps = {
  setTravelOffer: (travelOffer: Partial<TravelOffer>) => void;
  travelOffer: Partial<TravelOffer> /*No s eesta utilizando*/;
  userLocation: Location;
  isLoadingSearch: boolean;
  listFastIsLoaded: boolean;
  listScheduleIsLoaded: boolean;

  listTravelFast: TravelOffer[];
  listTravelSchedule: TravelOffer[];
  searchListTravelFast: () => void;
  searchListTravelSchedule: () => void;

  addTravelFastbySocket: (travelOffer: TravelOffer) => void;
  addTravelSchedulebySocket: (travelOffer: TravelOffer) => void;
};
const travelInicialState: TravelState = {
  travelOffer: {},
  userLocation: {latitude: -0.14, longitude: -70},
  isLoadingSearch: false,
  listFastIsLoaded: false,
  listScheduleIsLoaded: false,
  listTravelSchedule: [],
  listTravelFast: [],
};

export const TravelContext = createContext({} as TravelContextProps);

export const TravelProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(travelReducer, travelInicialState);

  useEffect(() => {
    getCurrentLocation().then(location => {
      dispatch({type: 'set_user_location', payload: location});
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const setTravelOffer = (travelOffer: Partial<TravelOffer>) => {
    try {
      dispatch({
        type: 'set_travel_offer',
        payload: {travel: travelOffer},
      });
    } catch (error) {
      console.error('TryError', error);
    }
  };

  const searchListTravelFast = (): void => {
    if (state.listFastIsLoaded) {
      return;
    }
    try {
      dispatch({type: 'set_isloading_search', payload: true});
      api
        .post<TravelOfferResp>('/travels/getList', {
          filter: {
            state: ['=', 'order'],
            type: ['=', 'fast'],
            status: ['=', true],
          },
        })
        .then(response => {
          dispatch({
            type: 'set_travel_offer_list',
            payload: {travels: response.data.data},
          });
          dispatch({type: 'set_isloading_search', payload: false});
        })
        .catch(err => {
          console.error('PostError', err);
          dispatch({type: 'set_isloading_search', payload: false});
        });
    } catch (error) {
      console.error('TryError', error);
      dispatch({type: 'set_isloading_search', payload: false});
    }
  };
  const searchListTravelSchedule = (): void => {
    if (state.listScheduleIsLoaded) {
      return;
    }
    try {
      //dispatch({type: 'set_isloading_search', payload: true});
      api
        .post<TravelOfferResp>('/travels/getList', {
          filter: {
            state: ['=', 'order'],
            type: ['=', 'schedule'],
            status: ['=', true],
          },
        })
        .then(response => {
          dispatch({
            type: 'set_travel_offer_list_schedule',
            payload: {travels: response.data.data},
          });
        })
        .catch(err => console.error('PostError', err));
    } catch (error) {
      console.error('TryError', error);
    } finally {
      //dispatch({type: 'set_isloading_search', payload: false});
    }
  };

  const addTravelFastbySocket = (travelOffer: TravelOffer) => {
    dispatch({
      type: 'add_travel_fast_by_socket',
      payload: {travel: travelOffer},
    });
  };
  const addTravelSchedulebySocket = (travelOffer: TravelOffer) => {
    dispatch({
      type: 'add_travel_schedule_by_socket',
      payload: {travel: travelOffer},
    });
  };

  return (
    <TravelContext.Provider
      value={{
        ...state,
        setTravelOffer,
        searchListTravelFast,
        searchListTravelSchedule,
        addTravelFastbySocket,
        addTravelSchedulebySocket,
      }}>
      {children}
    </TravelContext.Provider>
  );
};
