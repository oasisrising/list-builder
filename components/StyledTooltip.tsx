import { Tooltip, TooltipProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const StyledTooltip: React.FC<TooltipProps> = ({ title, children }) => (
  <Tooltip title={<Typography variant='body2'>{title}</Typography>}>
    {children}
  </Tooltip>
);
