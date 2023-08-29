'use client';

import React from 'react';
import { Unit } from '../../models/Unit';
import UnitCard from '../UnitCard/UnitCard';
import { UnitDataContext } from '../../providers/UnitDataProvider/UnitDataContext';
import { Box } from '@mui/material';

export function UnitCardList() {
  const { allUnitsData, selectedUnit } = React.useContext(UnitDataContext);
  const currentUnit = React.useMemo(
    () =>
      allUnitsData.find((unit) => unit.id === selectedUnit) ?? allUnitsData[0],
    [selectedUnit, allUnitsData]
  );
  return <UnitCard unit={currentUnit} />;
}
