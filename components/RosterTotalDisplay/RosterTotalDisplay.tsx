'use client';

import { Typography } from '@mui/material';
import { RosterDataContext } from '../../providers/RosterDataProvider/RosterDataContext';
import React from 'react';
import _ from 'lodash';

export const RosterTotalDisplay: React.FC = () => {
  const { rosterUnits, unitCount } = React.useContext(RosterDataContext);
  const [totalPoints, setTotalPoints] = React.useState(0);

  React.useEffect(() => {
    const points = _.sumBy(
      rosterUnits,
      (rosterUnit) => rosterUnit.points.points
    );
    setTotalPoints(points);
  }, [unitCount, rosterUnits]);

  return (
    <Typography variant='h3'>{`Total roster points: ${totalPoints}`}</Typography>
  );
};
