'use client';

import { createContext } from 'react';
import { Unit } from '../../models/Unit';
import React from 'react';

interface RosterDataContextProps {
  units: Unit[];
  addUnit: (unit: Unit) => void;
}

export const RosterDataContext = createContext<RosterDataContextProps>({
  units: [],
  addUnit: null,
});

export default function RosterDataProvider({ children }) {
  const [units, setUnits] = React.useState<Unit[]>([]);

  const handleAddUnit = (unit: Unit) => {
    setUnits(units.concat([unit]));
  };

  return (
    <RosterDataContext.Provider
      value={{
        units: units,
        addUnit: handleAddUnit,
      }}
    >
      {children}
    </RosterDataContext.Provider>
  );
}
