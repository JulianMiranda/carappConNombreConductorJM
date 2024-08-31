import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import {StackNavigator} from './src/navigator/navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {SocketProvider} from './src/context/SocketContext';
import {ChatProvider} from './src/context/chat/ChatContext';
import {TravelProvider} from './src/context/travel/TravelContext';
import {TravelProcessProvider} from './src/context/travelProcess/TravelProcessConetx';

const AppState = ({children}: any) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <ToastProvider>
          <PermissionsProvider>
            <AuthProvider>
              <TravelProvider>
                <SocketProvider>
                  <ChatProvider>
                    <ThemeProvider>
                      <TravelProcessProvider>{children}</TravelProcessProvider>
                    </ThemeProvider>
                  </ChatProvider>
                </SocketProvider>
              </TravelProvider>
            </AuthProvider>
          </PermissionsProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
};
export default App;
