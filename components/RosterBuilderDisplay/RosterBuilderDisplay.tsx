'use client';

import React from 'react';
import { FactionDataContext } from '../../providers/FactionDataProvider/FactionDataContext';
import UnitDataProvider from '../../providers/UnitDataProvider/UnitDataContext';
import RosterDataProvider from '../../providers/RosterDataProvider/RosterDataContext';
import { Box, Toolbar } from '@mui/material';
import { FactionIndexTable } from '../FactionIndex/FactionIndex';
import { RosterTable } from '../Roster/Roster';
import { UnitCardList } from '../UnitCardList/UnitCardList';
import { RosterToolbar } from './components/RosterToolbar/RosterToolbar';

export const RosterBuilderDisplay: React.FC<{ factionId: string }> = ({
  factionId,
}) => {
  const { allFactionData, setCurrentFaction } =
    React.useContext(FactionDataContext);

  React.useEffect(() => {
    setCurrentFaction(factionId);
  }, [factionId]);
  const factionData = allFactionData.find(
    (faction) => faction.id === factionId
  );
  if (!factionData) {
    return null;
  }
  return (
    <UnitDataProvider allUnitsData={factionData.units}>
      <RosterDataProvider factionId={factionId}>
        <Box sx={{ maxHeight: '100%', overflow: 'auto' }}>
          <RosterToolbar faction={factionData} />
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
