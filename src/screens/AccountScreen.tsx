import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Fab} from '../components/Fab';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/mainNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthContext} from '../context/auth/AuthContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'AccountScreen'> {}

export const AccountScreen = () => {
  const navigation = useNavigation<PropsNavigation>();
  const {user, logOut} = useContext(AuthContext);
  const toast = useToast();

  const {top} = useSafeAreaInsets();
  const handleLogout = async () => {
    const resp = await logOut();
    if (resp) {
      navigation.navigate('HomeScreen');
    } else {
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
    }
  };
  return (
    <View style={styles.container}>
      <Fab
        iconName="close"
        onPress={() => navigation.goBack()}
        style={{top: top + 20, position: 'absolute', left: 20}}
      />
      <View style={{marginTop: top + 20}}>
        <View style={styles.info}>
          <Text>Mi cuenta</Text>
          <Text style={styles.name}>
            {user?.name} {user?.lastName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleLogout()}>
          <Text style={styles.textButton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  info: {marginTop: 100, margin: 20},
  name: {fontSize: 24, fontWeight: '900'},

  button: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  textButton: {
    color: '#fff',
    fontWeight: '700',
  },
});
