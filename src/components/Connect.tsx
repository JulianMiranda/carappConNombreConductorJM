import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GradientBackground} from './GradientBackground';
import {ThemeContext} from '../context/theme/ThemeContext';
import {AuthContext} from '../context/auth/AuthContext';

interface Props {}
export const Connect = ({}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {user, driverConnectFast, loadingConnect} = useContext(AuthContext);

  const handleConnect = () => {
    if (loadingConnect) {
      return;
    } else {
      driverConnectFast();
    }
  };

  useEffect(() => {
    console.log('User', user?.id);
  }, [user]);

  return (
    <>
      <GradientBackground>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.textHistory}>Premios</Text>
            <Text style={styles.textHistoryBody}>Garantizados 120 MLC</Text>
          </View>

          <View style={styles.historyContainer}>
            <TouchableOpacity
              activeOpacity={loadingConnect ? 1 : 0.8}
              style={{...styles.button, backgroundColor: colors.primary}}
              onPress={() => handleConnect()}>
              <View style={styles.textContainer}>
                {loadingConnect && (
                  <ActivityIndicator style={styles.activity} />
                )}
                <Text style={styles.textButton}>
                  {user && user.acceptFastTravel
                    ? 'Desconectarse'
                    : 'Conectarse'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 10,
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: '#FDFDFD',
  },
  mainContainer: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
  },
  historyContainer: {
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingTop: 20,
    paddingLeft: 10,
  },
  textHistory: {
    fontSize: 16,
    fontWeight: '600',
  },
  textHistoryBody: {
    fontWeight: '400',
  },
  textButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activity: {
    marginRight: 5,
    alignSelf: 'flex-start',
  },
});
