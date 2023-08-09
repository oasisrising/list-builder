'use client';

import React from 'react';
import { Unit } from '../../models/Unit';
import UnitCard from '../UnitCard/UnitCard';
import { UnitDataContext } from '../../providers/UnitDataProvider/UnitDataContext';
import { Box } from '@mui/material';

export function UnitCardList() {
  const { allUnitsData } = React.useContext(UnitDataContext);

  return (
    <>
      {allUnitsData.map((unit: Unit) => (
        <Box key={unit.id}>
          <UnitCard unit={unit} />
        </Box>
      ))}
    </>
  );
}
