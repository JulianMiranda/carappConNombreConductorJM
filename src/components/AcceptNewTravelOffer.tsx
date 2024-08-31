import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getTravelTypeField} from '../utils/getTravelType';
import {formatToCurrency} from '../utils/formatToCurrency';
import {useSocket} from '../context/SocketContext';
import {useToast} from 'react-native-toast-notifications';
import {TravelOffer} from '../interfaces/TravelInfo.interface';
import {RootStackParams} from '../navigator/travelStack';
import {AuthContext} from '../context/auth/AuthContext';

interface Props {
  travelOffer: TravelOffer;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'FindClientScreen'> {}

export const AcceptNewTravelOffer = ({travelOffer}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {bottom} = useSafeAreaInsets();
  const {respuestaPropuesta, onViajeConfirmado, onViajeNoConfirmado, socket} =
    useSocket();
  const [waitConfirmPropouse, setwaitConfirmPropouse] = useState(false);
  const {user, updateUser} = useContext(AuthContext);

  const navigation = useNavigation<PropsNavigation>();
  const toast = useToast();

  const handleConfirm = () => {
    if (waitConfirmPropouse) {
      return;
    }
    setwaitConfirmPropouse(true);
    respuestaPropuesta({
      id: travelOffer.id,
      accepted: true,
    });
  };

  useEffect(() => {
    const handleViajeConfirmado = (data: TravelOffer) => {
      console.log('Viaje confirmado:Navegar a FindClientScreen', data.id);

      if (user) {
        updateUser({...user, isInTravel: true});
      }
    };
    const handleViajeNoConfirmado = (data: {message: string}) => {
      console.log('Viaje no confirmado:', data);
      setwaitConfirmPropouse(false);
      toast.show(data.message, {
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
      navigation.goBack();
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
  }, [socket]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.price}>
          <View style={styles.carContainer}>
            <View>
              {travelOffer.type && (
                <Text style={styles.title}>
                  {getTravelTypeField(travelOffer.type)}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textPrice}>
              {formatToCurrency(travelOffer.cost)}{' '}
              {travelOffer.payment.currency}
            </Text>
          </View>
        </View>
        <View style={styles.paymentType}>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentLabel}>Pago: </Text>
            <Text style={styles.paymentText}>
              {travelOffer.payment.currency}
            </Text>
            {/* <Icon name={'local-atm'} size={26} color={colors.primary} /> */}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 20,
          backgroundColor: colors.primary,
        }}
        activeOpacity={waitConfirmPropouse ? 1 : 0.8}
        onPress={() => handleConfirm()}>
        {waitConfirmPropouse ? (
          <>
            <ActivityIndicator size={24} color={'#fff'} />
          </>
        ) : (
          <Text style={styles.textConfirm}>Aceptar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    left: '2.5%',
    width: '95%',
  },
  container: {backgroundColor: '#FDFDFD', borderRadius: 20},
  carContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  price: {
    zIndex: 999999999999999,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  title: {fontSize: 26, fontWeight: 'bold'},
  textPrice: {fontSize: 26, fontWeight: 'bold', marginRight: 10},
  textPriceDollar: {fontSize: 18, fontWeight: 'bold', marginRight: 10},
  text: {fontSize: 16, color: '#5f5f5f'},
  paymentType: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {fontSize: 18, marginLeft: 10},
  paymentText: {fontSize: 18, fontWeight: 'bold', marginLeft: 10},

  textConfirm: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
