import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {ShowTravelOfferScreen} from '../screens/ShowTravelOfferScreen';
import {TopTabsNavigator} from './topTabsNavigator';
import {AccountScreen} from '../screens/AccountScreen';
import {LoginScreen} from '../screens/Login/LoginScreen';
import {TravelOffer} from '../interfaces/TravelInfo.interface';
import {TravelStack} from './travelStack';
import {TravelProcessContext} from '../context/travelProcess/TravelProcessConetx';
import {useSocket} from '../context/SocketContext';
import {TravelContext} from '../context/travel/TravelContext';

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeScreen: undefined;
  ShowTravelOfferScreen: {travelOffer: TravelOffer};
  TravelCenterScreen: undefined;
  AccountScreen: undefined;
  LoginScreen: undefined;
  TravelStack: undefined;
};

export const MainStack = () => {
  const {userInTravel} = useContext(TravelProcessContext);
  const {socket, onPropuestaViaje} = useSocket();
  const {addTravelFastbySocket} = useContext(TravelContext);

  useEffect(() => {
    const handlePropuestaViaje = (data: TravelOffer) => {
      console.log('Home Received propuesta-viaje:', data);
      if (data.id && data.driver) {
        addTravelFastbySocket(data);
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
    <Stack.Navigator>
      {userInTravel ? (
        <Stack.Screen
          name="TravelStack"
          component={TravelStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ShowTravelOfferScreen"
            component={ShowTravelOfferScreen}
            options={{
              headerShown: false,
              headerMode: 'float',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="TravelCenterScreen"
            component={TopTabsNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
