import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ListTravelEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        No hay viajes disponibles en estos momentos.
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
