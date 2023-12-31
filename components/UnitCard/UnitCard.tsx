'use client';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import React, { useRef } from 'react';
import {
  Unit,
  RangedStats,
  MeleeStats,
  WeaponType,
  Ability,
} from '../../models/Unit';
import { UnitStatDisplay } from './components/UnitStatDisplay';
import { DARKER_GREY } from '../../styles/CustomTheme';
import { WeaponTable } from './components/WeaponsTable';
import { UnitDataContext } from '../../providers/UnitDataProvider/UnitDataContext';
import _ from 'lodash';
import { PointsDisplay } from './components/PointsDisplay';

const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  const theme = useTheme();

  return (
    <>
      <Paper
        sx={{
          [theme.breakpoints.down('desktop')]: { margin: '24px 8px' }, // anything smaller than desktop will have smaller left/right margins
          margin: '24px',
          overflow: 'auto',
        }}
        elevation={5}
      >
        <Grid
          container
          sx={{
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.default,
          }}
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
        <Grid container sx={{ backgroundColor: DARKER_GREY }}>
          {unit.unitStats.map((unitStat) => (
            <UnitStatDisplay {...unitStat} key={unitStat.type} />
          ))}
        </Grid>
        <WeaponTable
          stats={RangedStats}
          type={WeaponType.Ranged}
          weapons={unit.weapons.filter(
            (weapon) => weapon.weaponType === WeaponType.Ranged
          )}
        />
        <WeaponTable
          stats={MeleeStats}
          type={WeaponType.Melee}
          weapons={unit.weapons.filter(
            (weapon) => weapon.weaponType === WeaponType.Melee
          )}
        />
        <Grid container sx={{ backgroundColor: DARKER_GREY }}>
          <Grid item mobile={12} tablet={6}>
            <SpecialAbilitiesDisplay
              title='Abilities'
              abilities={unit.abilities}
            />
            <SpecialAbilitiesDisplay
              title='Wargear Abilities'
              abilities={unit.wargearAbilities}
            />
          </Grid>
          <Grid item mobile={12} tablet={6}>
            <SpecialRulesDisplay
              title='Wargear Options'
              rules={unit.wargearOptions}
            />
            <SpecialRulesDisplay
              title='Unit Composition'
              rules={unit.unitComposition}
            />
            <SpecialRulesDisplay title='leader' rules={unit.leadership} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UnitCard;

const SpecialRulesDisplay: React.FC<{ title: string; rules: string[] }> = ({
  title,
  rules,
}) => {
  const theme = useTheme();

  if (rules.length === 0) {
    return null;
  }
  return (
    <Grid item mobile={12}>
      <Paper
        sx={{
          margin: '8px',
          overflow: 'auto',
        }}
      >
        <Typography
          variant='h3'
          sx={{
            backgroundColor: theme.palette.background.default,
            paddingLeft: '4px',
          }}
        >
          {title}
        </Typography>
        {rules.map((line, index) => (
          <Typography
            variant='body2'
            sx={{ paddingLeft: '4px' }}
            key={`${index}${line}`}
          >
            {line}
          </Typography>
        ))}
      </Paper>
    </Grid>
  );
};

const SpecialAbilitiesDisplay: React.FC<{
  title: string;
  abilities: Ability[];
}> = ({ title, abilities }) => {
  const theme = useTheme();

  if (abilities.length === 0) {
    return null;
  }
  return (
    <Grid item mobile={12}>
      <Paper
        sx={{
          margin: '8px',
          overflow: 'auto',
        }}
      >
        <Typography
          variant='h3'
          sx={{
            backgroundColor: theme.palette.background.default,
            paddingLeft: '4px',
          }}
        >
          {title}
        </Typography>
        {abilities.map((ability) => (
          <Box key={ability.name}>
            <Typography variant='body2' sx={{ paddingLeft: '4px' }}>
              <b>{ability.name}</b>
              {`: `}
              {ability.description}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );
};
