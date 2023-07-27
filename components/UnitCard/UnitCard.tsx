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
import { AddCircle } from '@mui/icons-material';
import { StyledTooltip as Tooltip } from '../StyledTooltip';
import { RosterDataContext } from '../RosterDataProvider/RosterDataContext';

const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  const { selectedUnit } = React.useContext(UnitDataContext);
  const { addUnit } = React.useContext(RosterDataContext);
  const theme = useTheme();
  const ref = useRef(null);

  React.useEffect(() => {
    if (selectedUnit === unit.id) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedUnit]);

  const handleAddToRoster = () => {
    addUnit(unit);
  };

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
        spacing={2}
        sx={{ padding: theme.spacing(2), backgroundColor: DARK_GREY }}
      >
        <Grid item mobile={12} desktop={8}>
          <Typography variant='h1' color='white'>
            {unit.name}
          </Typography>
        </Grid>
        <Grid item mobile={12} desktop={4}>
          {unit.points.map((points) => (
            <Box display='flex' justifyContent='left' alignItems='center'>
              <Typography variant='body1' color='white'>
                {`${points.modelCount} model${
                  points.modelCount > 1 ? 's' : ''
                }: ${points.points} pts`}
              </Typography>
              <Tooltip title='Add to roster'>
                <IconButton
                  aria-lable='add to roster'
                  color='secondary'
                  onClick={handleAddToRoster}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Grid>
      </Grid>
      {/* </Box> */}
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
