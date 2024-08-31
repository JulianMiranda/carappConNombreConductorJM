import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useContext, useEffect} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {MainStack} from './mainNavigator';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {permissions} = useContext(PermissionsContext);

  useEffect(() => {
    console.log(permissions);
  }, [permissions]);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: 'white'},
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen
          name="MainStack"
          options={{title: 'Principal'}}
          component={MainStack}
        />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};
