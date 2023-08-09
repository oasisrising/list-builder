'use client';

import { createContext } from 'react';
import { RosterUnit, Unit, UnitPointsData } from '../../models/Unit';
import React from 'react';
import _ from 'lodash';

interface RosterDataContextProps {
  rosterUnits: RosterUnit[];
  addUnit: (unit: Unit, points: UnitPointsData) => void;
  removeUnit: (unitPointsData: UnitPointsData) => void;
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

  const handleAddUnit = (unit: Unit, points: UnitPointsData) => {
    setRosterUnits(rosterUnits.concat([{ unit: unit, points: points }]));

    setUnitCount(unitCount + 1);
  };

  const handleRemoveUnit = (unitPointsData: UnitPointsData) => {
    const indexToRemove = _.findIndex(
      rosterUnits,
      (rosterUnit) =>
        rosterUnit.unit.id === unitPointsData.id &&
        rosterUnit.points.modelCount === unitPointsData.modelCount
    );

    // if the unit isn't in the roster, do nothing
    if (indexToRemove === -1) {
      return;
    }
    setRosterUnits(
      _.reject(rosterUnits, (unit, index) => index === indexToRemove)
    );
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
