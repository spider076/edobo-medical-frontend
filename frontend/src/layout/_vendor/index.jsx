'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'src/redux';
import { toggleSidebar } from 'src/redux/slices/settings';

// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// components
import DashboardAppbar from './topbar';
import DashboardSidebar from './sidebar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

export default function MiniDrawer({ children }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(toggleSidebar(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(toggleSidebar(false));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardAppbar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <DashboardSidebar handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative', overflow: 'hidden' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
MiniDrawer.propTypes = {
  children: PropTypes.node.isRequired
};
