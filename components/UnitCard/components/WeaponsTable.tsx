'use client';
import { mdiCrosshairs, mdiSwordCross } from '@mdi/js';
import Icon from '@mdi/react';
import { Box, Typography, Grid, styled } from '@mui/material';
import {
  StatType,
  WeaponSpecialRules,
  WeaponStat,
  WeaponType,
  statDescriptions,
} from '../../../models/Unit';
import { DARK_GREY } from '../../../styles/CustomTheme';
import { StyledTooltip as Tooltip } from '../../StyledTooltip';
import React from 'react';
import { WeaponDataContext } from '../../WeaponDataProvider/WeaponDataContext';

export const WeaponTable: React.FC<{
  stats: StatType[];
  type: WeaponType;
  weapons: WeaponStat[];
}> = ({ stats, type, weapons }) => {
  if (weapons.length === 0) {
    return null;
  }
  return (
    <Box>
      <Grid container>
        <HeaderRowItem
          item
          mobile={5}
          sx={{ justifyContent: 'start', paddingLeft: '4px' }}
        >
          <Box
            sx={{
              padding: '0 4px',
              display: { mobile: 'none', desktop: 'block' },
            }}
          >
            <Icon
              color='white'
              path={type === WeaponType.Ranged ? mdiCrosshairs : mdiSwordCross}
              size='24px'
            />
          </Box>
          <Typography variant='h3'>{type}</Typography>
        </HeaderRowItem>
        {stats.map((stat, index) => (
          <Tooltip title={statDescriptions[stat]} key={stat}>
            <HeaderRowItem item mobile={index === 0 ? 2 : 1}>
              <Typography variant='h3' textAlign='center'>
                {stat}
              </Typography>
            </HeaderRowItem>
          </Tooltip>
        ))}
        {weapons.map((weapon) => (
          <Grid
            mobile={12}
            container
            sx={{
              borderBottomStyle: 'solid',
              borderBottomWidth: 'thin',
              borderBottomColor: DARK_GREY,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              mobile={5}
              sx={{
                justifyContent: 'start',
                paddingLeft: '4px',
              }}
            >
              <Typography>{weapon.name}</Typography>
            </Grid>
            {stats.map((stat, index) => (
              <TableRowItem key={stat} item mobile={index === 0 ? 2 : 1}>
                <Typography>
                  {
                    weapon.weaponStats.find(
                      (weaponStat) => weaponStat.type === stat
                    )?.value
                  }
                </Typography>
              </TableRowItem>
            ))}
            <Grid
              item
              mobile={12}
              sx={{
                justifyContent: 'start',
                paddingLeft: '4px',
              }}
            >
              <SpecialRulesDisplay specialRules={weapon.specialRules} />
            </Grid>
          </Grid>
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SpecialRulesDisplay: React.FC<{ specialRules: WeaponSpecialRules[] }> = ({
  specialRules,
}) => {
  if (specialRules.length === 0) {
    return null;
  }
  return (
    <Box display='flex'>
      <Typography variant='subtitle2'>{`[`}</Typography>
      {specialRules.map((specialRule, index) => (
        <>
          <SpecialRuleTooltip rule={specialRule} />
          {index < specialRules.length - 1 && (
            <Typography variant='subtitle2'>,&nbsp;</Typography>
          )}
        </>
      ))}
      <Typography variant='subtitle2'>{`]`}</Typography>
    </Box>
  );
};

const SpecialRuleTooltip: React.FC<{ rule: WeaponSpecialRules }> = ({
  rule,
}) => {
  const [title, setTitle] = React.useState('');
  const { allWeaponsData } = React.useContext(WeaponDataContext);

  const handleOpen = () => {
    const description = allWeaponsData[rule.id];
    setTitle(description);
  };

  return (
    <Tooltip title={title ?? rule.name} onOpen={handleOpen}>
      <Typography variant='subtitle2'>{rule.name}</Typography>
    </Tooltip>
  );
};
