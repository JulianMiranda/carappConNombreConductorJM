import React, {createContext, useReducer, useContext, useEffect} from 'react';
import {travelProcessReducer, TravelProcessState} from './travelProcessReducer';
import {TravelOffer} from '../../interfaces/TravelInfo.interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';

interface TravelProcessContextProps {
  currentTravel: TravelOffer | null;
  isLoading: boolean;
  error: string | null;
  userInTravel: boolean;
  setCurrentTravel: (travel: TravelOffer) => void;
  updateUserInTravel: (isInTravel: boolean) => void;
  cancelTravel: (viajeId: string, otherUser: string) => Promise<boolean>;
}
const initialState: TravelProcessState = {
  currentTravel: null,
  isLoading: false,
  userInTravel: false,
  error: null,
};
export const TravelProcessContext = createContext<TravelProcessContextProps>(
  {} as TravelProcessContextProps,
);

export const TravelProcessProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(travelProcessReducer, initialState);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user && user.isInTravel !== undefined) {
      updateUserInTravel(user.isInTravel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setCurrentTravel = async (travel: TravelOffer) => {
    dispatch({type: 'set_isLoading', payload: true});
    try {
      dispatch({type: 'set_current_travel', payload: travel});
    } catch (error) {
      dispatch({type: 'set_error', payload: 'Error accepting travel'});
    }
  };

  const cancelTravel = async (
    viajeId: string,
    otherUser: string,
  ): Promise<boolean> => {
    try {
      await api.put<Promise<boolean>>(`/travels/cancelTravel/${viajeId}`, {
        otherUser,
      });
      dispatch({type: 'clear_current_travel'});
      return true;
    } catch (error) {
      console.log('error cancel', error);
      return false;
    }
  };

  const updateUserInTravel = async (isInTravel: boolean) => {
    if (isInTravel) {
      try {
        const response = await api.get<TravelOffer>('/travels/getDriverTravel');
        setCurrentTravel(response.data);
      } catch (error) {
        dispatch({type: 'set_error', payload: 'Failed to get travel'});
        dispatch({type: 'clear_current_travel'});
      }
    }

    dispatch({type: 'setUserInTravel', payload: {isInTravel}});
  };

  return (
    <TravelProcessContext.Provider
      value={{
        ...state,
        setCurrentTravel,
        cancelTravel,
        updateUserInTravel,
      }}>
      {children}
    </TravelProcessContext.Provider>
  );
};

// Hook para usar el contexto
export const useTravelProcess = () => useContext(TravelProcessContext);
