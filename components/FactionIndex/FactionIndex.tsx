'use client';

import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Unit } from '../../models/Unit';
import { UnitDataContext } from '../UnitDataProvider/UnitDataContext';
import React from 'react';

export function FactionIndexTable() {
  const { allUnitsData, setSelectedUnit } = React.useContext(UnitDataContext);

  const handleRowClick = (selectedId) => () => {
    setSelectedUnit(selectedId);
  };

  return (
    <Table>
      <TableBody>
        {allUnitsData.map((unit: Unit) => (
          <TableRow
            onClick={handleRowClick(unit.id)}
            sx={{ cursor: 'pointer' }}
            key={unit.id}
          >
            <TableCell>{unit.name}</TableCell>
            <TableCell>{unit.points[0].points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function FactionIndexMenu({ onClick }) {
  const { allUnitsData, setSelectedUnit } = React.useContext(UnitDataContext);

  const handleClick = (selectedId) => () => {
    setSelectedUnit(selectedId);
    onClick();
  };

  return (
    <>
      {allUnitsData.map((unit: Unit) => (
        <MenuItem onClick={handleClick(unit.id)}>
          <Typography>{unit.name}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
