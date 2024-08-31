import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FindClientScreen} from '../screens/FindClientScreen';

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams = {
  FindClientScreen: undefined;
};

export const TravelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindClientScreen"
        component={FindClientScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
