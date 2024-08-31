import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
}

export const Fab = ({
  iconName,
  onPress,
  style = {},
  styleButton = {},
}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress()}
        style={{...styles.blackButton}}>
        <Icon
          name={iconName}
          color="black"
          size={26}
          style={{left: 1, ...(styleButton as any)}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
