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
import React from 'react';
import { RosterDataContext } from '../RosterDataProvider/RosterDataContext';

export function RosterTable() {
  const { units } = React.useContext(RosterDataContext);

  if (units.length === 0) {
    return <Typography variant='body1'>Your roster is empty!</Typography>;
  }

  return (
    <Table>
      <TableBody>
        {units.map((unit: Unit) => (
          <TableRow sx={{ cursor: 'pointer' }}>
            <TableCell>{unit.name}</TableCell>
            <TableCell>{unit.points[0].points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RosterMenu({ onClick }) {
  const { units } = React.useContext(RosterDataContext);
  if (units.length === 0) {
    return <MenuItem>Your roster is empty!</MenuItem>;
  }

  return (
    <>
      {units.map((unit: Unit) => (
        <MenuItem>
          <Typography>{unit.name}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
