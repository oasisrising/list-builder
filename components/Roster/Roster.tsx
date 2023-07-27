'use client';

import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { RosterUnit, Unit } from '../../models/Unit';
import React from 'react';
import { RosterDataContext } from '../RosterDataProvider/RosterDataContext';
import { UnitDataContext } from '../UnitDataProvider/UnitDataContext';

export function RosterTable() {
  const { rosterUnits } = React.useContext(RosterDataContext);
  const { setSelectedUnit } = React.useContext(UnitDataContext);

  const handleRowClick = (selectedId) => () => {
    setSelectedUnit(selectedId);
  };

  if (rosterUnits.length === 0) {
    return <Typography variant='body1'>Your roster is empty!</Typography>;
  }

  return (
    <Table>
      <TableBody>
        {rosterUnits.map((rosterUnit: RosterUnit) => (
          <TableRow
            onClick={handleRowClick(rosterUnit.unit.id)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>{rosterUnit.unit.name}</TableCell>
            <TableCell>
              {rosterUnit.count} x {rosterUnit.unit.points[0].points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RosterMenu({ onClick }) {
  const { rosterUnits: rosterUnits } = React.useContext(RosterDataContext);
  const { setSelectedUnit } = React.useContext(UnitDataContext);

  const handleClick = (selectedId) => () => {
    setSelectedUnit(selectedId);
    onClick();
  };

  if (rosterUnits.length === 0) {
    return <MenuItem>Your roster is empty!</MenuItem>;
  }

  return (
    <>
      {rosterUnits.map((rosterUnit: RosterUnit) => (
        <MenuItem onClick={handleClick(rosterUnit.unit.id)}>
          <Typography>{`${rosterUnit.unit.name} x ${rosterUnit.count}`}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
