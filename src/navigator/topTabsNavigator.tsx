import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FastListSreen} from '../screens/FastListSreen';
import {ScheduleListScreen} from '../screens/ScheduleListScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/theme/ThemeContext';

const Tab = createMaterialTopTabNavigator<RootStackParams>();

export type RootStackParams = {
  FastListSreen: undefined;
  ScheduleListScreen: undefined;
};

export const TopTabsNavigator = () => {
  const {top: paddingTop} = useSafeAreaInsets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      style={{paddingTop, backgroundColor: 'white'}}
      sceneContainerStyle={{backgroundColor: 'white'}}
      tabBarPosition={'top'}
      screenOptions={{
        tabBarPressColor: 'rgba(255,0,50,0.12)',
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {fontSize: 12},
      }}>
      <Tab.Screen
        name="FastListSreen"
        component={FastListSreen}
        options={{title: 'Actual'}}
      />
      <Tab.Screen
        name="ScheduleListScreen"
        component={ScheduleListScreen}
        options={{title: 'Calendario'}}
      />
    </Tab.Navigator>
  );
};
