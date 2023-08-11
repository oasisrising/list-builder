'use client';

import { createContext } from 'react';
import { Unit } from '../../models/Unit';
import React from 'react';

interface UnitDataContextProps {
  allUnitsData: Unit[];
  setSelectedUnit?: (unitId: string) => void;
  selectedUnit: string;
}

export const UnitDataContext = createContext<UnitDataContextProps>({
  allUnitsData: [],
  selectedUnit: '',
});

export default function UnitDataProvider({ children, allUnitsData }) {
  const [selectedUnit, setSelectedUnit] = React.useState<string>('');
  return (
    <UnitDataContext.Provider
      value={{
        allUnitsData: allUnitsData,
        setSelectedUnit: setSelectedUnit,
        selectedUnit: selectedUnit,
      }}
    >
      {children}
    </UnitDataContext.Provider>
  );
}
