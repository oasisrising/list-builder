'use client';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useRef } from 'react';
import { Unit, RangedStats, MeleeStats, WeaponType } from '../../models/Unit';
import { UnitStatDisplay } from './components/UnitStatDisplay';
import { DARKER_GREY, DARK_GREY } from '../../styles/CustomTheme';
import { WeaponTable } from './components/WeaponsTable';
import { UnitDataContext } from '../UnitDataProvider/UnitDataContext';
import _ from 'lodash';
import { PointsDisplay } from './components/PointsDisplay';

const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  const { selectedUnit } = React.useContext(UnitDataContext);

  const theme = useTheme();
  const ref = useRef(null);

  React.useEffect(() => {
    if (selectedUnit === unit.id) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedUnit]);

  return (
    <Paper
      sx={{
        [theme.breakpoints.down('desktop')]: { margin: '24px 8px' }, // anything smaller than desktop will have smaller left/right margins
        margin: '24px',
        overflow: 'auto',
      }}
      elevation={5}
      ref={ref}
    >
      <Grid
        container
        sx={{ padding: theme.spacing(1), backgroundColor: DARK_GREY }}
      >
        <Grid item mobile={12} desktop={8}>
          <Typography variant='h1' color='white'>
            {unit.name}
          </Typography>
          <Typography
            variant='subtitle2'
            color='white'
          >{`Keywords: ${unit.keywords.join(', ')}`}</Typography>
        </Grid>
        <Grid item mobile={12} desktop={4}>
          <PointsDisplay unit={unit} />
        </Grid>
      </Grid>
      <Box display='flex' sx={{ backgroundColor: DARKER_GREY }}>
        {unit.unitStats.map((unitStat) => (
          <UnitStatDisplay {...unitStat} key={unitStat.type} />
        ))}
      </Box>
      <WeaponTable
        stats={RangedStats}
        type={WeaponType.Ranged}
        weapons={unit.weapons}
      />
      <WeaponTable
        stats={MeleeStats}
        type={WeaponType.Melee}
        weapons={unit.weapons}
      />
    </Paper>
  );
};

export default UnitCard;
