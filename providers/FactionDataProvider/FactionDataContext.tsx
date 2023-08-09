'use client';

import { createContext } from 'react';
import React from 'react';
import { Faction } from '../../models/Faction';

interface FactionContextProps {
  allFactionData: Faction[];
}

export const FactionDataContext = createContext<FactionContextProps>({
  allFactionData: [],
});

export default function FactionDataProvider({ children, allFactionData }) {
  return (
    <>
      its big
      <FactionDataContext.Provider
        value={{
          allFactionData,
        }}
      >
        {children}
      </FactionDataContext.Provider>
    </>
  );
}
