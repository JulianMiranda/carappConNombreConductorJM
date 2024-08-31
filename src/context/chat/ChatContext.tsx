import React, {createContext, useEffect, useReducer} from 'react';
import {ChatState, chatReducer} from './chatReducer';
import {User} from '../../interfaces/User.interface';

type ChatContextProps = {
  users: User[] | null;
};

const chatInicialState: ChatState = {
  users: [],
};

export const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(chatReducer, chatInicialState);

  useEffect(() => {
    dispatch({
      type: 'load-users',
      payload: {users: []},
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        ...state,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
