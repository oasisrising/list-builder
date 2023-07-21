import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { mdiCrosshairs, mdiSwordCross } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import {
  Unit,
  Stat,
  statDescriptions,
  StatType,
  RangedStats,
  MeleeStats,
  WeaponType,
  WeaponStat,
} from '../../models/Unit';
import { UnitStatDisplay } from './components/UnitStatDisplay';
import { DARKER_GREY, DARK_GREY, LIGHT_GREY } from '../../styles/CustomTheme';

export const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <Paper
      sx={{ minWidth: 300, margin: '24px' }}
      elevation={5}
      variant='outlined'
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: DARK_GREY,
        }}
      >
        <Typography variant='h1' color='white'>
          {unit.name}
        </Typography>
        <Box>
          {unit.points.map((points) => (
            <Typography variant='body1' color='white'>
              {`${points.modelCount} model${
                points.modelCount > 1 ? 's' : ''
              }: ${points.points} pts`}
            </Typography>
          ))}
        </Box>
      </Box>
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

const WeaponTable: React.FC<{
  stats: StatType[];
  type: WeaponType;
  weapons: WeaponStat[];
}> = ({ stats, type, weapons }) => {
  return (
    <Box>
      <Table size='small'>
        <TableHead sx={{ background: DARK_GREY }}>
          <TableRow>
            <TableCell sx={{ padding: '4px 0 0 4px' }}>
              <Icon
                color='white'
                path={
                  type === WeaponType.Ranged ? mdiCrosshairs : mdiSwordCross
                }
                size='24px'
              />
            </TableCell>
            <TableCell width='320px'>
              <Typography variant='h3'>{type}</Typography>
            </TableCell>
            {stats.map((stat) => (
              <Tooltip title={statDescriptions[stat]} key={stat}>
                <TableCell>
                  <Typography variant='h3' textAlign='center'>
                    {stat}
                  </Typography>
                </TableCell>
              </Tooltip>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weapons
            .filter((weapon) => weapon.weaponType === type)
            .map((weapon) => (
              <TableRow key={weapon.name} sx={{ borderBottomStyle: 'solid' }}>
                <TableCell />
                <TableCell>
                  <Typography>{weapon.name}</Typography>
                </TableCell>
                {stats.map((stat) => (
                  <TableCell key={stat}>
                    <Typography textAlign='center'>
                      {
                        weapon.weaponStats.find(
                          (weaponStat) => weaponStat.type === stat
                        )?.value
                      }
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};
