import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Map} from '../components/Map';
import {Connect} from '../components/Connect';
import {RootStackParams} from '../navigator/mainNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {TravelCenter} from '../components/TravelCenter';
import {Account} from '../components/Account';
import {useSocket} from '../context/SocketContext';
import {TravelOffer} from '../interfaces/TravelInfo.interface';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}
export const HomeScreen = ({navigation}: Props) => {
  const {socket, onPropuestaViaje} = useSocket();

  useEffect(() => {
    const handlePropuestaViaje = (data: TravelOffer) => {
      console.log('Home Received propuesta-viaje:', data);
      if (data.id && data.driver) {
        navigation.navigate('ShowTravelOfferScreen', {travelOffer: data});
      }
    };
    onPropuestaViaje(handlePropuestaViaje);
    return () => {
      if (socket) {
        socket.off('propuesta-viaje', handlePropuestaViaje);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPropuestaViaje, socket]);

  return (
    <>
      <View style={styles.mapContainer}>
        <Account />
        <Map />
        <Connect />
        <TravelCenter />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  openMenuButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 10, height: 13},
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
