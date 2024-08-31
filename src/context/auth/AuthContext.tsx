import React, {createContext, useEffect, useReducer} from 'react';
import {User} from '../../interfaces/User.interface';
import {authReducer, AuthState} from './authReducer';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import api from '../../api/api';
import {removeToken, setToken} from '../../api/token';

export interface FavProp {
  name: string;
  place: TravelPoint;
}

type AuthContextProps = {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'login';
  user: User | null;
  logInWithId: (id: string) => Promise<boolean>;
  logIn: () => void;
  updateUser: (user: User) => void;
  logOut: () => Promise<boolean>;
  updateReciveNotifications: (user: User) => void;
  driverConnectFast: () => void;
  loadingConnect: boolean;
};

const authInicialState: AuthState = {
  status: 'checking',
  user: null,
  savedCards: [],
  loadingConnect: false,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const resp = await api.get<User>('/login');
      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
      dispatch({
        type: 'login',
        payload: {
          user: resp.data,
        },
      });
    } catch (error: any) {
      console.log('error login catch', JSON.stringify(error));

      if (error && error.message === 'Network Error') {
        dispatch({type: 'notInternet'});
      }
      dispatch({type: 'notAuthenticated'});
      // return dispatch({type: 'notAuthenticated'});
    }
  };

  const updateUser = async (user: User) => {
    try {
      dispatch({
        type: 'updateUser',
        payload: {
          user,
        },
      });
    } catch (error) {}
  };

  const logOut = async (): Promise<boolean> => {
    removeToken();
    dispatch({type: 'logout'});
    return true;
  };
  const logIn = async () => {
    dispatch({type: 'logout'});
  };

  const logInWithId = async (id: string): Promise<boolean> => {
    setToken(`TokenTest${id}`);
    try {
      console.log('logInWithId');

      const resp = await api.get<User>('/login');
      if (resp.status !== 200) {
        dispatch({type: 'notAuthenticated'});
        return false;
      }
      dispatch({
        type: 'login',
        payload: {
          user: resp.data,
        },
      });
      return true;
    } catch (error: any) {
      console.log('error login catch', error);
      if (error && error.message === 'Network Error') {
        dispatch({type: 'notInternet'});
      } else {
        dispatch({type: 'notAuthenticated'});
      }
      return false;
    }
  };
  const updateReciveNotifications = (user: User) => {
    dispatch({type: 'updateReciveNotifications', payload: user});
  };

  const driverConnectFast = () => {
    dispatch({
      type: 'setLoadingConnect',
      payload: {loadingConnect: true},
    });
    try {
      api
        .put<User>('users/update/' + state.user?.id, {
          acceptFastTravel: !state.user?.acceptFastTravel,
        })
        .then(response => {
          dispatch({
            type: 'driverConnectFast',
            payload: {acceptFastTravel: response.data.acceptFastTravel},
          });
          dispatch({
            type: 'setLoadingConnect',
            payload: {loadingConnect: false},
          });
        })
        .catch(err => {
          console.log('Err', err);
          dispatch({
            type: 'setLoadingConnect',
            payload: {loadingConnect: false},
          });
        });
    } catch (error) {
      console.log('Error', error);
      dispatch({
        type: 'setLoadingConnect',
        payload: {loadingConnect: false},
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logOut,
        logIn,
        logInWithId,
        updateUser,
        updateReciveNotifications,
        driverConnectFast,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
