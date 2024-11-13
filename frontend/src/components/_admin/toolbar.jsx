'use client';
import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// mui
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

ButtonAppBar.propTypes = {
  children: PropTypes.node.isRequired
};

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  background: alpha(theme.palette.background.default, 0.72),
  borderBottom: '1px solid ' + theme.palette.divider,
  borderRadius: 0,
  top: 65,
  width: `calc(100% - ${65}px)`,
  // , xs: 65 },
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    left: 0
  }
}));

export default function ButtonAppBar({ children }) {
  const { openSidebar } = useSelector((state) => state.settings);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: 1,
          mb: 2,
          display: { sm: 'block', xs: 'none' }
        }}
      >
        <AppBar
          open={openSidebar}
          sx={{
            zIndex: 997 + '!important',
            pl: 1.2
          }}
        >
          <Toolbar sx={{ minHeight: 48 }}>{children}</Toolbar>
        </AppBar>
        <Box sx={{ height: 48 }} />
      </Box>
      <Box
        sx={{
          display: { sm: 'none', xs: 'block' }
        }}
      >
        {children}
      </Box>
    </>
  );
}
