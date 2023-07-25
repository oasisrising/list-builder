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
  const { allUnitsData } = React.useContext(UnitDataContext);

  return (
    <Table>
      <TableBody>
        {allUnitsData.map((unit: Unit) => (
          <TableRow>
            <TableCell>{unit.name}</TableCell>
            <TableCell>{unit.points[0].points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function FactionIndexMenu({ onClick }) {
  const { allUnitsData } = React.useContext(UnitDataContext);

  console.log(allUnitsData);
  return (
    <>
      {allUnitsData.map((unit: Unit) => (
        <MenuItem onClick={onClick}>
          <Typography>{unit.name}</Typography>
          {/* <Typography>{unit.points[0].points}</Typography> */}
        </MenuItem>
      ))}
    </>
  );
}
