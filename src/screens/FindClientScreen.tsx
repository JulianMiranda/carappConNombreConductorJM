import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/travelStack';
import {TravelProcessContext} from '../context/travelProcess/TravelProcessConetx';
import {FindUserToruble} from '../components/FindUserToruble';
import LinearGradient from 'react-native-linear-gradient';
import {MapTravel} from '../components/MapTravel';
import {MapComp} from '../components/MapComp';

interface Props extends StackScreenProps<RootStackParams, 'FindClientScreen'> {}

export const FindClientScreen = ({}: Props) => {
  const {top} = useSafeAreaInsets();
  const {currentTravel, cancelTravel} = useContext(TravelProcessContext);
  const [isLoading, setisLoading] = useState(false);
  const handleEnd = async () => {
    if (isLoading) {
      return;
    }
    if (!currentTravel) {
      return;
    }
    setisLoading(true);
    const resp = await cancelTravel(currentTravel.id, currentTravel.user);
    setisLoading(false);
    if (resp) {
      console.log('cancelTravel con exito');
    }
  };
  if (!currentTravel) {
    return <FindUserToruble />;
  }
  return (
    <>
      <View style={styles.container}>
        {/* <Fab
          iconName="close"
          onPress={() => navigation.goBack()}
          style={{top: top + 20, position: 'absolute', left: 20}}
        /> */}

        {currentTravel?.fromLocation?.travelPoint && (
          <>
            <MapComp
              to={currentTravel.toLocation.travelPoint}
              from={currentTravel.fromLocation.travelPoint}
            />
          </>
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
        {/* <AcceptNewTravelOffer travelOffer={travelOffer} /> */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={isLoading ? 1 : 0.8}
          onPress={() => handleEnd()}>
          <Text style={styles.textButton}>Cancelar carrera</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  info: {marginTop: 100, margin: 20},
  name: {fontSize: 24, fontWeight: '900'},

  button: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
    position: 'absolute',
    bottom: 50,
    zIndex: 99999999,
  },
  textButton: {
    color: '#fff',
    fontWeight: '700',
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
