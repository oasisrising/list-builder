'use client';

import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FactionDataContext } from '../../providers/FactionDataProvider/FactionDataContext';
import { useRouter } from 'next/navigation';

export default function FactionsDisplay() {
  const { allFactionData, setCurrentFaction } =
    React.useContext(FactionDataContext);

  const router = useRouter();

  if (!setCurrentFaction) {
    return null;
  }

  const handleFactionClicked = (id: string) => () => {
    setCurrentFaction(id);
    router.push(`/factions/${id}`);
  };

  return (
    <Grid container spacing={2}>
      {allFactionData.map((faction) => (
        <Grid item key={faction.id}>
          <Card
            sx={{
              width: '180px',
              height: '180px',
              alignContent: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexWrap: 'wrap',
              background: faction.color,
            }}
            onClick={handleFactionClicked(faction.id)}
          >
            <Typography variant='h3'>{faction.name}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
