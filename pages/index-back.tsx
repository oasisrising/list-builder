import Head from 'next/head';
import Layout from '../components/layout';
import { getSortedUnitsData } from '../lib/units';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import image from '../public/images/Image_029.png';
import {
  FactionIndexMenu,
  FactionIndexTable,
} from '../components/FactionIndex/FactionIndex';
import ToolbarMenuButton from '../components/ToolbarMenuButton/ToolbarMenuButton';
import { CustomTheme } from '../styles/CustomTheme';
import UnitDataProvider from '../providers/UnitDataProvider/UnitDataContext';
import { UnitCardList } from '../components/UnitCardList/UnitCardList';
import { RosterMenu, RosterTable } from '../components/Roster/Roster';
import RosterDataProvider from '../providers/RosterDataProvider/RosterDataContext';
import { RosterTotalDisplay } from '../components/RosterTotalDisplay/RosterTotalDisplay';
import { getWeaponAbilitiesData } from '../lib/weapons';
import WeaponsDataProvider from '../providers/WeaponDataProvider/WeaponDataContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledTooltip } from '../components/StyledTooltip';

export async function getStaticProps() {
  const allFactionsData = getSortedUnitsData();
  return {
    props: {
      allUnitsData: allFactionsData[1].units,
      allWeaopnsAbilities: getWeaponAbilitiesData(),
    },
  };
}

export default function Home({ allUnitsData, allWeaopnsAbilities }) {
  return (
    <UnitDataProvider allUnitsData={allUnitsData}>
      <RosterDataProvider>
        <WeaponsDataProvider allWeaponsData={allWeaopnsAbilities}>
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
                    <IconButton color='secondary'>
                      <ArrowBackIcon />
                    </IconButton>
                  </StyledTooltip>
                  <ToolbarMenuButton
                    MenuItems={FactionIndexMenu}
                    title='Grey Knights index'
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
        </WeaponsDataProvider>
      </RosterDataProvider>
    </UnitDataProvider>
  );
}
