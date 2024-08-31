import React, {
  createContext,
  useEffect,
  useContext,
  useRef,
  ReactNode,
  useState,
} from 'react';
import {AuthContext} from './auth/AuthContext';
import {io, Socket} from 'socket.io-client';
import {socketURL} from '../api/api';

interface RespProp {
  id: string;
  accepted: boolean;
}

interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
  respuestaPropuesta: ({id, accepted}: RespProp) => void;
  onPropuestaViaje: (callback: (data: any) => void) => void;
  onViajeConfirmado: (callback: (data: any) => void) => void;
  onViajeNoConfirmado: (callback: (data: any) => void) => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined,
);

export const SocketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {status, user} = useContext(AuthContext);
  const [online, setOnline] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && user?.id) {
      const socket = io(socketURL, {
        extraHeaders: {
          'x-token': user.id,
        },
      });
      socketRef.current = socket;
      socket.on('connect', () => {
        setOnline(true);
      });

      socket.on('disconnect', () => {
        setOnline(false);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, status]);

  const respuestaPropuesta = ({id, accepted}: RespProp) => {
    if (socketRef.current) {
      console.log('enviar propuesta a viaje', id);
      socketRef.current.emit('respuesta-propuesta', {
        id,
        driver: user!.id,
        accepted,
      });
    }
  };

  const onPropuestaViaje = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('propuesta-viaje', callback);
    }
  };

  const onViajeConfirmado = (callback: (data: any) => void) => {
    if (socketRef.current) {
      console.log('Socket viaje confirmado');
      socketRef.current.on('viaje-confirmado', callback);
    }
  };

  const onViajeNoConfirmado = (callback: (data: {message: string}) => void) => {
    if (socketRef.current) {
      console.log('Socket viaje no confirmado');
      socketRef.current.on('viaje-no-confirmado', callback);
    }
  };

  useEffect(() => {
    console.log(`User ${user?.id} isOnline ${online}`);
  }, [online, user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        online,
        respuestaPropuesta,
        onPropuestaViaje,
        onViajeConfirmado,
        onViajeNoConfirmado,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
