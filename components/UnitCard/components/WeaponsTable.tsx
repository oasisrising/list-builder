'use client';
import { mdiCrosshairs, mdiSwordCross } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  TableBody,
  Grid,
  styled,
} from '@mui/material';
import {
  StatType,
  WeaponStat,
  WeaponType,
  statDescriptions,
} from '../../../models/Unit';
import { DARK_GREY } from '../../../styles/CustomTheme';

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
        <HeaderRowItem item mobile={5} sx={{ justifyContent: 'start' }}>
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
            <>
              <TableRowItem
                item
                sx={{
                  display: { mobile: 'none', desktop: 'block' },
                }}
                mobile={1}
              />
              <TableRowItem item mobile={5} sx={{ justifyContent: 'start' }}>
                <Typography>{weapon.name}</Typography>
              </TableRowItem>
              {stats.map((stat, index) => (
                <TableRowItem
                  key={stat}
                  item
                  mobile={index === 0 ? 2 : 1}
                  desktop={1}
                >
                  <Typography>
                    {
                      weapon.weaponStats.find(
                        (weaponStat) => weaponStat.type === stat
                      )?.value
                    }
                  </Typography>
                </TableRowItem>
              ))}
            </>
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
