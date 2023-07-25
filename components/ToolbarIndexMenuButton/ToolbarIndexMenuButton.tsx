'use client';

import { IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { FactionIndexMenu } from '../FactionIndex/FactionIndex';

export default function ToolbarIndexMenuButton() {
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
      <IconButton
        color='secondary'
        sx={{ display: { mobile: 'block', desktop: 'none' } }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <FactionIndexMenu onClick={handleClose} />
      </Menu>
    </>
  );
}
