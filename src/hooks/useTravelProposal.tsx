import {useState, useEffect, useContext} from 'react';
import {useSocket} from '../context/SocketContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import {useToast} from 'react-native-toast-notifications';
import {TravelOffer} from '../interfaces/TravelInfo.interface';
import {AuthContext} from '../context/auth/AuthContext';

const useTravelProposal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {respuestaPropuesta, onViajeConfirmado, onViajeNoConfirmado, socket} =
    useSocket();
  const {updateUser, user} = useContext(AuthContext);

  const toast = useToast();

  useEffect(() => {
    const handleViajeConfirmado = () => {
      console.log('viaje confirmado');

      setIsLoading(false);
      if (user) {
        updateUser({...user, isInTravel: true});
      }
    };

    const handleViajeNoConfirmado = () => {
      console.log('viaje  no confirmado');
      setIsLoading(false);
      toast.show('Ups, algo falló, inténtelo más tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          zIndex: 9999,
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 35,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'rgba(255, 71, 71, 0.92)',
        },
        textStyle: {fontSize: 16, fontWeight: 'bold'},
        animationType: 'zoom-in',
      });
    };

    onViajeConfirmado(handleViajeConfirmado);
    onViajeNoConfirmado(handleViajeNoConfirmado);

    return () => {
      if (socket) {
        socket.off('viaje-confirmado', handleViajeConfirmado);
        socket.off('viaje-no-confirmado', handleViajeNoConfirmado);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptTravel = (travel: TravelOffer) => {
    console.log('travel', travel.id);

    setIsLoading(true);
    respuestaPropuesta({
      id: travel.id,
      accepted: true,
    });
  };

  return {isLoading, acceptTravel};
};

export default useTravelProposal;
