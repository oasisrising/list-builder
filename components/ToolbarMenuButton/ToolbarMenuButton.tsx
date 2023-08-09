'use client';

import { IconButton, Menu, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { StyledTooltip } from '../StyledTooltip';

export default function ToolbarMenuButton({ MenuItems, title }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography
        variant='h3'
        sx={{ display: { mobile: 'none', laptop: 'flex' } }}
      >
        {title}
      </Typography>
      <StyledTooltip title={title}>
        <IconButton
          color='secondary'
          sx={{ display: { mobile: 'flex', laptop: 'none' } }}
          onClick={handleClick}
          aria-label={title}
        >
          <MenuIcon />
        </IconButton>
      </StyledTooltip>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItems onClick={handleClose} />
      </Menu>
    </>
  );
}
