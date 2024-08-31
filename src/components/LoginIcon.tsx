import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  name: string;
  onPress: () => void;
}
export const LoginIcon = ({name, onPress}: Props) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Icon name={name} size={26} />
      </TouchableOpacity>
    </>
  );
};
