import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const GradientBackground = ({children}: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={[
          'rgba(255,255,255,0)',
          'rgba(255,255,255,0.7)',
          'rgba(255,255,255,0.9)',
          '#F3F3F3',
        ]}>
        {children}
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 30,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
