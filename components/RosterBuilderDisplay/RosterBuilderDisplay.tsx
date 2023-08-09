'use client';

import React from 'react';
import { FactionDataContext } from '../../providers/FactionDataProvider/FactionDataContext';
import UnitDataProvider from '../../providers/UnitDataProvider/UnitDataContext';
import RosterDataProvider from '../../providers/RosterDataProvider/RosterDataContext';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import {
  FactionIndexMenu,
  FactionIndexTable,
} from '../FactionIndex/FactionIndex';
import { RosterMenu, RosterTable } from '../Roster/Roster';
import { RosterTotalDisplay } from '../RosterTotalDisplay/RosterTotalDisplay';
import { StyledTooltip } from '../StyledTooltip';
import ToolbarMenuButton from '../ToolbarMenuButton/ToolbarMenuButton';
import { UnitCardList } from '../UnitCardList/UnitCardList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import image from '../../public/images/Image_029.png';
import Link from 'next/link';

export const RosterBuilderDisplay: React.FC<{ factionId: string }> = ({
  factionId,
}) => {
  const { allFactionData } = React.useContext(FactionDataContext);
  const factionData = allFactionData.find(
    (faction) => faction.id === factionId
  );
  if (!factionData) {
    return null;
  }
  return (
    <UnitDataProvider allUnitsData={factionData.units}>
      <RosterDataProvider>
        <Box sx={{ maxHeight: '100%', overflow: 'auto' }}>
          <AppBar>
            <Toolbar
              sx={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box display='flex' alignItems='center'>
                <StyledTooltip title='Switch faction'>
                  <Link href={`/`}>
                    <IconButton color='secondary'>
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>
                </StyledTooltip>
                <ToolbarMenuButton
                  MenuItems={FactionIndexMenu}
                  title={`${factionData.name} index`}
                />
              </Box>
              <RosterTotalDisplay />
              <ToolbarMenuButton MenuItems={RosterMenu} title='Your roster' />
            </Toolbar>
          </AppBar>
          <Box display='flex' flexDirection='column' height='100vh'>
            <Toolbar />
            <Box
              flexGrow={1}
              display='flex'
              overflow='hidden'
              justifyContent='space-between'
            >
              <Box
                overflow='auto'
                sx={{ display: { mobile: 'none', laptop: 'block' } }}
                minWidth='250px'
              >
                <FactionIndexTable />
              </Box>
              <Box overflow='auto' width='100%'>
                <UnitCardList />
              </Box>
              <Box
                overflow='auto'
                sx={{ display: { mobile: 'none', laptop: 'block' } }}
                minWidth='250px'
              >
                <RosterTable />
              </Box>
            </Box>
          </Box>
        </Box>
      </RosterDataProvider>
    </UnitDataProvider>
  );
};
