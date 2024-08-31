import {useEffect, useState, useRef} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/TravelInfo.interface';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const watchId = useRef<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      console.log('isMounted.current', isMounted.current);
      if (!isMounted.current) return;

      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routes => [...routes, location]);

      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      err => console.log(err),
      {enableHighAccuracy: true, distanceFilter: 10, interval: 10000},
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines,
  };
};
