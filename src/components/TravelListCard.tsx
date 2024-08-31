import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {formatToCurrency} from '../utils/formatToCurrency';
import {TravelOffer} from '../interfaces/TravelInfo.interface';

interface Props {
  travel: TravelOffer;
  isLoading: boolean;
  handleAccept: (travel: TravelOffer) => void;
}
export const TravelListCard = ({travel, handleAccept, isLoading}: Props) => {
  const formatDate = (travelDate: Date) => {
    return travelDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.subcard}>
        <View>
          <Text style={styles.title}>
            {travel.fromLocation.travelPoint.name} -{' '}
            {travel.toLocation.travelPoint.name}
          </Text>

          <Text style={styles.details}>
            Fecha: {new Date(travel.date).toLocaleDateString()}
          </Text>
          <Text style={styles.details}>
            Hora: {formatDate(new Date(travel.date))}
          </Text>
        </View>
        <View>
          <Text style={styles.price}>
            {formatToCurrency(travel.cost)} {travel.payment.currency}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAccept(travel)}>
        {isLoading ? (
          <>
            <ActivityIndicator size={20} color={'#fff'} />
          </>
        ) : (
          <Text style={styles.buttonText}>Acceptar viaje</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subcard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
