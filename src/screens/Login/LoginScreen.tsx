import React, {useState, useRef, useContext} from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Fab} from '../../components/Fab';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoginIcon} from '../../components/LoginIcon';
import {AuthContext} from '../../context/auth/AuthContext';
import {useToast} from 'react-native-toast-notifications';

interface Props extends DrawerScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const rotation = useRef(new Animated.Value(0)).current;
  const [arrowVisible, setArrowVisible] = useState(false);
  const {logInWithId} = useContext(AuthContext);
  const toast = useToast();

  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleLoginIcon = (icon: string) => {
    if (icon === 'arrow') {
      logInWithId(phone).then((resp: boolean) => {
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
      });
    }
  };

  const handleChangeText = (text: string) => {
    setPhone(text);

    if (text && !arrowVisible) {
      setArrowVisible(true);
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <>
      <Fab
        iconName="close"
        onPress={handleCloseButton}
        style={{...styles.backButton, top: top + 15}}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/CarAppBackground.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.movil}>
          <Text style={styles.text}>Comencemos</Text>
          <View style={styles.containerInput}>
            <View>
              <Text style={styles.code}>+53</Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={handleChangeText}
              style={styles.input}
              placeholder="Ingresa tu celular"
            />
            {arrowVisible && (
              <Animated.View style={{transform: [{rotate}]}}>
                <TouchableOpacity onPress={() => handleLoginIcon('arrow')}>
                  <Text style={styles.arrow}>➔</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
          <View style={styles.icons}>
            <LoginIcon
              name="facebook"
              onPress={() => handleLoginIcon('facebook')}
            />
            <LoginIcon name="login" onPress={() => handleLoginIcon('google')} />
            <LoginIcon name="apple" onPress={() => handleLoginIcon('apple')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 15,
    zIndex: 99999999999,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 5,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    position: 'absolute',
    bottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  movil: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 20,
  },
  movilInside: {
    backgroundColor: 'fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    flex: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  code: {fontSize: 16, fontWeight: 'bold', marginRight: 5},
  containerInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '50%',
  },
  icons: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    marginLeft: 10,
  },
});
