'use client';
import { mdiCrosshairs, mdiSwordCross } from '@mdi/js';
import Icon from '@mdi/react';
import { Box, Typography, Grid, styled } from '@mui/material';
import {
  StatType,
  WeaponStat,
  WeaponType,
  statDescriptions,
} from '../../../models/Unit';
import { DARK_GREY } from '../../../styles/CustomTheme';
import { StyledTooltip as Tooltip } from '../../StyledTooltip';

export const WeaponTable: React.FC<{
  stats: StatType[];
  type: WeaponType;
  weapons: WeaponStat[];
}> = ({ stats, type, weapons }) => {
  return (
    <Box>
      <Grid container>
        <HeaderRowItem
          item
          sx={{
            padding: '4px 0 0 4px',
            display: { mobile: 'none', desktop: 'block' },
          }}
          mobile={1}
        >
          <Icon
            color='white'
            path={type === WeaponType.Ranged ? mdiCrosshairs : mdiSwordCross}
            size='24px'
          />
        </HeaderRowItem>
        <HeaderRowItem
          item
          mobile={5}
          sx={{ justifyContent: 'start', paddingLeft: '4px' }}
        >
          <Typography variant='h3'>{type}</Typography>
        </HeaderRowItem>
        {stats.map((stat, index) => (
          <Tooltip title={statDescriptions[stat]} key={stat}>
            <HeaderRowItem item mobile={index === 0 ? 2 : 1} desktop={1}>
              <Typography variant='h3' textAlign='center'>
                {stat}
              </Typography>
            </HeaderRowItem>
          </Tooltip>
        ))}
        {weapons
          .filter((weapon) => weapon.weaponType === type)
          .map((weapon) => (
            <TableRowItem mobile={12} container>
              <Grid
                item
                sx={{
                  display: { mobile: 'none', desktop: 'block' },
                }}
                mobile={1}
                key={weapon.name}
              />
              <Grid
                item
                mobile={5}
                desktop={4}
                sx={{
                  justifyContent: 'start',
                  paddingLeft: '4px',
                }}
              >
                <Typography>{weapon.name}</Typography>
              </Grid>
              {stats.map((stat, index) => (
                <Grid key={stat} item mobile={index === 0 ? 2 : 1}>
                  <Typography>
                    {
                      weapon.weaponStats.find(
                        (weaponStat) => weaponStat.type === stat
                      )?.value
                    }
                  </Typography>
                </Grid>
              ))}
              <Grid
                item
                mobile={1}
                sx={{
                  display: { mobile: 'none', desktop: 'block' },
                }}
              />
              <Grid
                item
                mobile={12}
                desktop={11}
                sx={{
                  justifyContent: 'start',
                  paddingLeft: '4px',
                }}
              >
                <SpecialRulesDisplay specialRules={weapon.specialRules} />
              </Grid>
            </TableRowItem>
          ))}
      </Grid>
    </Box>
  );
};

const HeaderRowItem = styled(Grid)({
  background: DARK_GREY,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TableRowItem = styled(Grid)({
  borderBottomStyle: 'solid',
  borderBottomWidth: 'thin',
  borderBottomColor: DARK_GREY,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SpecialRulesDisplay: React.FC<{ specialRules: string[] }> = ({
  specialRules,
}) => {
  if (specialRules.length === 0) {
    return null;
  }
  return (
    <Typography variant='subtitle2'>{`[${specialRules.join(
      ', '
    )}]`}</Typography>
  );
};
