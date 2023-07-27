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

export async function getStaticProps() {
  const allUnitsData = getSortedUnitsData();
  getSortedUnitsData();
  return {
    props: {
      allUnitsData,
    },
  };
}

export default function Home({ allUnitsData }) {
  return (
    <Layout home>
      <Head>
        <title>LIST BUILDER</title>
      </Head>
      <CustomTheme>
        <UnitDataProvider allUnitsData={allUnitsData}>
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
                <Box flexGrow={1} display='flex' overflow='hidden'>
                  <Box
                    overflow='auto'
                    sx={{ display: { mobile: 'none', desktop: 'block' } }}
                  >
                    <FactionIndexTable />
                  </Box>
                  <Box overflow='auto'>
                    <UnitCardList />
                  </Box>
                  <Box
                    overflow='auto'
                    sx={{ display: { mobile: 'none', desktop: 'block' } }}
                    minWidth='200px'
                  >
                    <RosterTable />
                  </Box>
                </Box>
              </Box>
            </Box>
          </RosterDataProvider>
        </UnitDataProvider>
      </CustomTheme>
    </Layout>
  );
}
