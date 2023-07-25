'use client';
import { Tooltip, Box, Typography, useTheme } from '@mui/material';
import { Stat, statDescriptions } from '../../../models/Unit';
import { DARK_GREY, LIGHT_GREY } from '../../../styles/CustomTheme';

export const UnitStatDisplay: React.FC<Stat> = ({ type, value }) => {
  const theme = useTheme();
  return (
    <Tooltip title={statDescriptions[type]}>
      <Box
        sx={{
          width: '42px',
          height: '42px',
          textAlign: 'center',
          padding: '4px',
          margin: '4px',
          border: `2px solid ${DARK_GREY}`,
          backgroundColor: LIGHT_GREY,
        }}
      >
        <Typography variant='h3' color={DARK_GREY}>
          {type}
        </Typography>
        <Typography variant='h2' color={DARK_GREY}>
          {value}
        </Typography>
      </Box>
    </Tooltip>
  );
};