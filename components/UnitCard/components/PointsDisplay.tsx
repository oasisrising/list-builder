import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { RosterUnit, Unit, UnitPointsData } from '../../../models/Unit';
import React from 'react';
import { RosterDataContext } from '../../../providers/RosterDataProvider/RosterDataContext';
import _ from 'lodash';

export const PointsDisplay: React.FC<{ unit: Unit }> = ({ unit }) => {
  const { rosterUnits } = React.useContext(RosterDataContext);

  return (
    <>
      {unit.points.map((points) => (
        <Box
          display='flex'
          justifyContent='left'
          alignItems='center'
          key={`${unit.id} ${points.points}`}
        >
          <Typography variant='body1' color='white'>
            {`${points.modelCount} model${points.modelCount > 1 ? 's' : ''}: ${
              points.points
            } pts`}
          </Typography>
          <RosterPointControls
            unit={unit}
            points={points}
            rosterUnits={rosterUnits.filter(
              (rosterPoints) =>
                rosterPoints.points.id === points.id &&
                rosterPoints.points.modelCount === points.modelCount
            )}
          />
        </Box>
      ))}
    </>
  );
};

export const RosterPointControls: React.FC<{
  unit: Unit;
  points: UnitPointsData;
  rosterUnits: RosterUnit[];
}> = ({ unit, points, rosterUnits }) => {
  const { removeUnit, addUnit } = React.useContext(RosterDataContext);

  const handleRemoveFromRoster = () => {
    removeUnit(points);
  };
  const handleAddToRoster = () => {
    addUnit(unit, points);
  };

  return (
    <>
      <Tooltip title='Add to roster'>
        <IconButton
          aria-label='add to roster'
          color='secondary'
          onClick={handleAddToRoster}
        >
          <AddCircle />
        </IconButton>
      </Tooltip>
      {rosterUnits.length > 0 && (
        <>
          <Typography variant='body1' color='secondary'>
            {`x ${rosterUnits.length}`}
          </Typography>
          <Tooltip title='Remove from roster'>
            <IconButton
              aria-label='Remove from roster'
              color='secondary'
              onClick={handleRemoveFromRoster}
            >
              <RemoveCircle />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};
