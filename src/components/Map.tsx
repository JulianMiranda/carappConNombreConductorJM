import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Balls} from './Balls';

interface Props {
  markers?: (typeof Marker)[];
}

export const Map = ({markers}: Props) => {
  const [showPolyline, setShowPolyline] = useState(false);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    console.log('hasLocation', hasLocation);
  }, [hasLocation]);
  useEffect(() => {
    if (!following.current) return;

    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={Platform.OS === 'ios' ? true : false}
        style={styles.map}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
        {Platform.OS === 'android' && (
          <Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude,
            }}
            title="Usuario"
            description="Tú localización">
            <Balls color="blue" style={{}} />
          </Marker>
        )}
      </MapView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
