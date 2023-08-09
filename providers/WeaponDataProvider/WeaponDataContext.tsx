'use client';

import { createContext } from 'react';
import React from 'react';

interface WeaponDataContextProps {
  allWeaponsData: any;
}

export const WeaponDataContext = createContext<WeaponDataContextProps>({
  allWeaponsData: null,
});

export default function WeaponsDataProvider({ children, allWeaponsData }) {
  return (
    <WeaponDataContext.Provider
      value={{
        allWeaponsData: allWeaponsData,
      }}
    >
      {children}
    </WeaponDataContext.Provider>
  );
}
