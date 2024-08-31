import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RootStackParams} from '../navigator/mainNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthContext} from '../context/auth/AuthContext';
import {FadeInImage} from './FadeInImage';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'AccountScreen'> {}
export const Account = () => {
  const navigation = useNavigation<PropsNavigation>();

  const {user, status} = useContext(AuthContext);

  const {top} = useSafeAreaInsets();
  const [image, setImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSNVadl7hVUSbVON7Y3Zya3A58yOHJx3unQ&usqp=CAU',
  );
  useEffect(() => {
    if (user) {
      setImage(user.image.url);
    }
  }, [user]);

  const handleMenu = () => {
    if (status === 'authenticated') {
      navigation.navigate('AccountScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={{...styles.container, top: top + 20}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleMenu()}
        style={styles.button}>
        <FadeInImage uri={image} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    zIndex: 9999999,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 4,
  },
  image: {height: 50, width: 50, borderRadius: 50, resizeMode: 'contain'},
});
