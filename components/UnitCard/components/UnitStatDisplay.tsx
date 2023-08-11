'use client';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Stat, statDescriptions } from '../../../models/Unit';
import { LIGHT_GREY } from '../../../styles/CustomTheme';
import { StyledTooltip as Tooltip } from '../../StyledTooltip';

export const UnitStatDisplay: React.FC<Stat> = ({ type, value }) => {
  const theme = useTheme();

  return (
    <Grid item>
      <Tooltip title={statDescriptions[type]}>
        <Box
          sx={{
            minWidth: '42px',
            height: '42px',
            textAlign: 'center',
            padding: '4px',
            margin: '4px',
            border: `2px solid ${theme.palette.background.default}`,
            backgroundColor: LIGHT_GREY,
          }}
        >
          <Typography variant='h3' color={theme.palette.background.default}>
            {type}
          </Typography>
          <Typography variant='h2' color={theme.palette.background.default}>
            {value}
          </Typography>
        </Box>
      </Tooltip>
    </Grid>
  );
};
