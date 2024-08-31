import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TravelPoint} from '../interfaces/TravelInfo.interface';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getDirections} from '../utils/getDirections';

interface Props {
  from: TravelPoint;
  to: TravelPoint;
}

const {height} = Dimensions.get('window');
export const MapTravel = ({from, to}: Props) => {
  const mapViewRef = useRef<MapView>(null);
  const following = useRef<boolean>(true);

  const {top} = useSafeAreaInsets();
  const [route, setRoute] = useState<any>(null);

  const [labelPosition, setLabelPosition] = useState<{
    fromLabel: number;
    toLabel: number;
  }>({fromLabel: 0, toLabel: 0});
  const [showCenterButton, setShowCenterButton] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isCentering, setIsCentering] = useState(false);

  useEffect(() => {
    getDirections(
      [from.coordinates.latitude, from.coordinates.longitude],
      [to.coordinates.latitude, to.coordinates.longitude],
    )
      .then(routeResp => {
        setRoute(routeResp);

        const deltaLat = to.coordinates.latitude - from.coordinates.latitude;
        const deltaLng = to.coordinates.longitude - from.coordinates.longitude;

        if (Math.abs(deltaLat) > Math.abs(deltaLng)) {
          if (deltaLat > 0) {
            // De abajo a arriba
            setLabelPosition({fromLabel: 20, toLabel: -20});
          } else {
            // De arriba a abajo
            setLabelPosition({fromLabel: -20, toLabel: 20});
          }
        } else {
          if (deltaLng > 0) {
            // De izquierda a derecha
            setLabelPosition({fromLabel: 20, toLabel: -20});
          } else {
            // De derecha a izquierda
            setLabelPosition({fromLabel: -20, toLabel: 20});
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [from, to]);

  const handleRegionChange = () => {
    if (!isFirstLoad && !isCentering) {
      setShowCenterButton(true);
    } else {
      setIsFirstLoad(false);
    }
  };

  const centerMap = () => {
    if (mapViewRef.current) {
      setIsCentering(true);
      console.log('centering map');

      mapViewRef.current.fitToSuppliedMarkers(['mk1', 'mk2'], {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: height * 0.6,
          left: 100,
        },
      });
    }
    setShowCenterButton(false);
    setTimeout(() => {
      setIsCentering(false);
    }, 1000);
  };
  useEffect(() => {
    centerMap();
  }, []);

  return (
    <>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={Platform.OS === 'ios' ? true : false}
        style={styles.map}
        initialRegion={{
          latitude: from.coordinates.latitude,
          longitude: from.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => {
          if (mapViewRef.current) {
            mapViewRef.current.fitToSuppliedMarkers(['mk1', 'mk2'], {
              edgePadding: {
                top: 100,
                right: 100,
                bottom: height * 0.6,
                left: 100,
              },
            });
          }
        }}
        onTouchStart={() => (following.current = false)}
        onRegionChangeComplete={handleRegionChange}>
        {route && (
          <Polyline
            coordinates={route}
            strokeWidth={4}
            strokeColor={'#31ABED'}
          />
        )}
        <Marker
          identifier={'mk1'}
          coordinate={{
            latitude: from.coordinates.latitude,
            longitude: from.coordinates.longitude,
          }}
          //title={from.name}
          description={from.name}
          calloutOffset={{x: 0, y: labelPosition.fromLabel}}
          calloutAnchor={{x: 0.5, y: labelPosition.fromLabel > 0 ? 1.5 : -0.5}}>
          <View style={[styles.mkBall, {backgroundColor: 'green'}]} />
        </Marker>
        <Marker
          identifier={'mk2'}
          coordinate={{
            latitude: to.coordinates.latitude,
            longitude: to.coordinates.longitude,
          }}
          title="Final"
          description={to.name}
          calloutOffset={{x: 0, y: 0}}
          calloutAnchor={{x: 0.5, y: labelPosition.toLabel > 0 ? 1.5 : -0.5}}>
          <View style={[styles.mkBall, {backgroundColor: 'red'}]} />
        </Marker>
      </MapView>
      {showCenterButton && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.centerButton, top: top + 20}}
          onPress={centerMap}>
          <Icon name="my-location" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mkBall: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  centerButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
});
