import Head from 'next/head';
import Layout from '../components/layout';
import { getSortedUnitsData } from '../lib/units';
import { AppBar, Box, Toolbar } from '@mui/material';
import image from '../public/images/Image_029.png';
import {
  FactionIndexMenu,
  FactionIndexTable,
} from '../components/FactionIndex/FactionIndex';
import ToolbarMenuButton from '../components/ToolbarMenuButton/ToolbarMenuButton';
import { CustomTheme } from '../styles/CustomTheme';
import UnitDataProvider from '../components/UnitDataProvider/UnitDataContext';
import { UnitCardList } from '../components/UnitCardList/UnitCardList';
import { RosterMenu, RosterTable } from '../components/Roster/Roster';
import RosterDataProvider from '../components/RosterDataProvider/RosterDataContext';
import { RosterTotalDisplay } from '../components/RosterTotalDisplay/RosterTotalDisplay';
import { getWeaponAbilitiesData } from '../lib/weapons';
import WeaponsDataProvider from '../components/WeaponDataProvider/WeaponDataContext';

export async function getStaticProps() {
  const allFactionsData = getSortedUnitsData();
  return {
    props: {
      allUnitsData: allFactionsData[0].units,
      allWeaopnsAbilities: getWeaponAbilitiesData(),
    },
  };
}

export default function Home({ allUnitsData, allWeaopnsAbilities }) {
  return (
    <Layout home>
      <Head>
        <title>LIST BUILDER</title>
      </Head>
      <CustomTheme>
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
                    <ToolbarMenuButton
                      MenuItems={FactionIndexMenu}
                      title='Grey Knights index'
                    />
                    <RosterTotalDisplay />
                    <ToolbarMenuButton
                      MenuItems={RosterMenu}
                      title='Your roster'
                    />
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
      </CustomTheme>
    </Layout>
  );
}
