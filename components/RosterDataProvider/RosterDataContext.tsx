'use client';

import { createContext } from 'react';
import { RosterUnit, Unit } from '../../models/Unit';
import React from 'react';
import _ from 'lodash';

interface RosterDataContextProps {
  rosterUnits: RosterUnit[];
  addUnit: (unit: Unit) => void;
  removeUnit: (unit: Unit) => void;
  unitCount: number;
}

export const RosterDataContext = createContext<RosterDataContextProps>({
  rosterUnits: [],
  addUnit: null,
  removeUnit: null,
  unitCount: 0,
});

const LOCAL_STORAGE_KEY = 'luminnova-roster';

export default function RosterDataProvider({ children }) {
  const [rosterUnits, setRosterUnits] = React.useState<RosterUnit[]>([]);
  const [unitCount, setUnitCount] = React.useState(0);

  React.useEffect(() => {
    setRosterUnits(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rosterUnits));
    }
  }, [rosterUnits, unitCount]);

  const handleAddUnit = (unit: Unit) => {
    const index = _.findIndex(
      rosterUnits,
      (rosterUnit) => rosterUnit.unit.id === unit.id
    );

    // if unit is in the roster already
    if (index >= 0) {
      rosterUnits[index].count += 1;
      setRosterUnits(rosterUnits);
    } else {
      setRosterUnits(rosterUnits.concat([{ unit: unit, count: 1 }]));
    }
    setUnitCount(unitCount + 1);
  };

  const handleRemoveUnit = (unit: Unit) => {
    const index = _.findIndex(
      rosterUnits,
      (rosterUnit) => rosterUnit.unit.id === unit.id
    );

    // if the unit isn't in the roster, do nothing
    if (index === -1) {
      return;
    }

    rosterUnits[index].count -= 1;
    setRosterUnits(_.filter(rosterUnits, (rosterUnit) => rosterUnit.count > 0));
    setUnitCount(unitCount - 1);
  };

  return (
    <RosterDataContext.Provider
      value={{
        rosterUnits: rosterUnits,
        addUnit: handleAddUnit,
        removeUnit: handleRemoveUnit,
        unitCount: unitCount,
      }}
    >
      {children}
    </RosterDataContext.Provider>
  );
}
