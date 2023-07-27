'use client';

import { Typography } from '@mui/material';
import { RosterDataContext } from '../RosterDataProvider/RosterDataContext';
import React from 'react';
import _ from 'lodash';

export const RosterTotalDisplay: React.FC = () => {
  const { units } = React.useContext(RosterDataContext);
  const [totalPoints, setTotalPoints] = React.useState(0);

  React.useEffect(() => {
    const points = _.sumBy(units, (unit) => unit.points[0].points);
    setTotalPoints(points);
  }, [units]);

  return (
    <Typography variant='h3'>{`Total roster points: ${totalPoints}`}</Typography>
  );
};
