'use client';

import React from 'react';
import { Unit } from '../../models/Unit';
import UnitCard from '../UnitCard/UnitCard';
import { UnitDataContext } from '../UnitDataProvider/UnitDataContext';

export function UnitCardList() {
  const { allUnitsData } = React.useContext(UnitDataContext);

  return (
    <>
      {allUnitsData.map((unit: Unit) => (
        <UnitCard unit={unit} key={unit.id} />
      ))}
    </>
  );
}
