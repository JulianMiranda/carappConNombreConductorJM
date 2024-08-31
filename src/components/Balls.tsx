/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  color: string;
  style?: StyleProp<ViewStyle>;
}
export const Balls = ({color, style}: Props) => {
  return (
    <View
      style={{
        padding: 10,
        zIndex: 9999999,
        ...(style as any),
      }}>
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 50,
          backgroundColor: '#FFF',

          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#f0f0f0',
          borderWidth: 1,
        }}>
        <View
          style={{
            height: 7,
            width: 7,
            borderRadius: 50,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};
