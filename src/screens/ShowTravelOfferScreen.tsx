import React from 'react';
import {AcceptNewTravelOffer} from '../components/AcceptNewTravelOffer';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapTravel} from '../components/MapTravel';
import LinearGradient from 'react-native-linear-gradient';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/mainNavigator';

interface Props
  extends StackScreenProps<RootStackParams, 'ShowTravelOfferScreen'> {}
export const ShowTravelOfferScreen = ({navigation, route}: Props) => {
  const {travelOffer} = route.params;
  const {top} = useSafeAreaInsets();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <>
      <TouchableOpacity
        style={{...styles.openMenuButton, marginTop: top}}
        onPress={() => handleClose()}>
        <Icon name={'close'} color="black" size={30} />
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        {travelOffer?.fromLocation?.travelPoint &&
          travelOffer?.toLocation?.travelPoint && (
            <MapTravel
              from={travelOffer.fromLocation.travelPoint}
              to={travelOffer.toLocation.travelPoint}
            />
          )}
        <View style={styles.backgroundGradient}>
          <LinearGradient
            style={{flex: 1}}
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.7)',
              'rgba(255,255,255,0.9)',
              '#F3F3F3',
            ]}
          />
        </View>
      </View>
      <AcceptNewTravelOffer travelOffer={travelOffer} />
    </>
  );
};

const styles = StyleSheet.create({
  openMenuButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FDFDFD',
    zIndex: 100,

    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 10, height: 13},
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    height: 200,
    zIndex: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#FDFDFD',
  },
});
