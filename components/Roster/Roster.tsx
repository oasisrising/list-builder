'use client';

import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { RosterUnit } from '../../models/Unit';
import React from 'react';
import { RosterDataContext } from '../../providers/RosterDataProvider/RosterDataContext';
import { UnitDataContext } from '../../providers/UnitDataProvider/UnitDataContext';
import _ from 'lodash';

export function RosterTable() {
  const { rosterUnits } = React.useContext(RosterDataContext);
  const { setSelectedUnit } = React.useContext(UnitDataContext);

  const handleRowClick = (selectedId) => () => {
    setSelectedUnit(selectedId);
  };

  if (rosterUnits.length === 0) {
    return <Typography variant='body1'>Your roster is empty!</Typography>;
  }

  const uniqueListItems = _.groupBy(
    rosterUnits,
    (unit) =>
      `${unit.points.id},${unit.points.modelCount},${unit.points.points}`
  );

  return (
    <Table>
      <TableBody>
        {Object.keys(uniqueListItems).map((key) => (
          <TableRow
            onClick={handleRowClick(uniqueListItems[key][0].unit.id)}
            sx={{ cursor: 'pointer' }}
            key={key}
          >
            <TableCell>{uniqueListItems[key][0].unit.name}</TableCell>
            <TableCell>
              {`${uniqueListItems[key].length} x ${uniqueListItems[key][0].points.points}`}
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

  const uniqueListItems = _.groupBy(
    rosterUnits,
    (unit) =>
      `${unit.points.id},${unit.points.modelCount},${unit.points.points}`
  );

  return (
    <>
      {Object.keys(uniqueListItems).map((key) => (
        <MenuItem onClick={handleClick(uniqueListItems[key][0].unit.id)}>
          <Typography>{`${uniqueListItems[key][0].unit.name} - ${uniqueListItems[key].length}`}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
