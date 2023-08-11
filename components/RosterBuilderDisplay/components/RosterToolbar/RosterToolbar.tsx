import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { FactionIndexMenu } from '../../../FactionIndex/FactionIndex';
import { RosterMenu } from '../../../Roster/Roster';
import { RosterTotalDisplay } from '../../../RosterTotalDisplay/RosterTotalDisplay';
import { StyledTooltip } from '../../../StyledTooltip';
import ToolbarMenuButton from '../../../ToolbarMenuButton/ToolbarMenuButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Faction } from '../../../../models/Faction';

export const RosterToolbar: React.FC<{ faction: Faction }> = ({ faction }) => {
  return (
    <AppBar>
      <Toolbar
        sx={{
          background: faction.color,
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
            title={`${faction.name} index`}
          />
        </Box>
        <RosterTotalDisplay />
        <ToolbarMenuButton MenuItems={RosterMenu} title='Your roster' />
      </Toolbar>
    </AppBar>
  );
};
