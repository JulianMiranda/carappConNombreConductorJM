import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const FindUserToruble = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Problemas para encontrar al usuario en estos momentos.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  message: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
