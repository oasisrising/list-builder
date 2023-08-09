'use client';

import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FactionDataContext } from '../../providers/FactionDataProvider/FactionDataContext';
import Link from 'next/link';

export default function FactionsDisplay() {
  const { allFactionData } = React.useContext(FactionDataContext);

  return (
    <Grid container spacing={2}>
      {allFactionData.map((faction) => (
        <Grid item key={faction.id}>
          <Card
            sx={{
              width: '180px',
              height: '180px',
              display: 'flex',
              alignContent: 'center',
              justifyItems: 'center',
            }}
          >
            <Link href={`/factions/${faction.id}`}>
              <CardContent>
                <Typography variant='h3' color='primary'>
                  {faction.name}
                </Typography>
                <Typography variant='subtitle1'>
                  {`${faction.units.length} units`}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
