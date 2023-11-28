import { atom, useAtom } from 'jotai';

export const dayNightAtom = atom((get) => {
  const currentHour = new Date().getHours();
  const isDay = currentHour >= 6 && currentHour < 18;
  return isDay;
});

export const useDayNight = () => useAtom(dayNightAtom);
