'use client';

import { createContext } from 'react';
import { Unit } from '../../models/Unit';

interface UnitDataContextProps {
  allUnitsData: Unit[];
}

export const UnitDataContext = createContext<UnitDataContextProps>({
  allUnitsData: [],
});

export default function UnitDataProvider({ children, allUnitsData }) {
  return (
    <UnitDataContext.Provider value={{ allUnitsData: allUnitsData }}>
      {children}
    </UnitDataContext.Provider>
  );
}
