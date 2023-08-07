import { Tooltip, TooltipProps, Typography } from '@mui/material';

export const StyledTooltip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    {...props}
    title={<Typography variant='body2'>{props.title}</Typography>}
  >
    {props.children}
  </Tooltip>
);
