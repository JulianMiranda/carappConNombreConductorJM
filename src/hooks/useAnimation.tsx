import {useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimation = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration: number = 700) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const startMovingPosition = (
    initPosition: number,
    finalPosition: number = 100,
    duration: number = 100,
  ) => {
    position.setValue(initPosition);

    Animated.timing(position, {
      toValue: finalPosition,
      duration,
      useNativeDriver: true,
      // easing: Easing.bounce
    }).start();
  };
 
  return {
    opacity,
    position,
    fadeIn,
    fadeOut,
    startMovingPosition,
  };
};
