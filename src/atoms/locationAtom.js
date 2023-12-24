import { atom, useAtom } from 'jotai';
import getLocation from '../functions/locationFunction';
import { useEffect } from 'react';

export const locationAtom = atom({
  latitude: 0,
  longitude: 0,
  city: 'Loading...',
});

export const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);

  useEffect(() => {
    getLocation().then((locationData) => {
      setLocation(locationData);
    });
  }, [setLocation]);

  return [location, setLocation];
};
