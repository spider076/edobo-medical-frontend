import * as React from 'react';

// mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box
      sx={{
        position: 'fixed',
        height: { md: 'calc(100vh - 66px)', xs: 'calc(100vh - 55px)' },
        top: { md: 66, xs: 0 },
        bottom: { md: 0, xs: 55 },
        left: 0,
        width: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 111
      }}
    >
      <Box sx={{ width: '200px' }}>
        <LinearProgress />
      </Box>
    </Box>
  );
}
