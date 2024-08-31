import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/mainNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'TravelCenterScreen'> {}

export const TravelCenter = () => {
  const navigation = useNavigation<PropsNavigation>();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <View style={{position: 'absolute', right: 10, bottom: 200}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('TravelCenterScreen')}
        style={styles.button}>
        <Icon name={'book'} color={colors.card} size={18} style={{left: 1}} />
        <Text style={{marginLeft: 3, color: colors.primary, fontSize: 10}}>
          {'Centro\n de viajes'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
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
});
