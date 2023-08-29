'use client';

import { createContext } from 'react';
import React from 'react';
import { Faction } from '../../models/Faction';
import { Dictionary } from 'lodash';

interface FactionContextProps {
  allFactionData: Faction[];
  setCurrentFaction: (id: string) => void;
  currentFaction: string;
}

export const FactionDataContext = createContext<FactionContextProps>({
  allFactionData: [],
  currentFaction: '',
  setCurrentFaction: () => {},
});

export default function FactionDataProvider({ children, allFactionData }) {
  const [currentFaction, setCurrentFaction] = React.useState('');

  return (
    <>
      <FactionDataContext.Provider
        value={{
          allFactionData,
          currentFaction,
          setCurrentFaction,
        }}
      >
        {children}
      </FactionDataContext.Provider>
    </>
  );
}
