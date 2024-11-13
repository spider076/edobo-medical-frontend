import React from 'react';
// mui
import { Box } from '@mui/material';
// components
import CompareTable from 'src/components/table/compareTable';

export default function Compare() {
  return (
    <Box mt={{ md: 5, xs: 3 }}>
      <Box mt={{ md: 5, xs: 3 }} pb={{ md: 7, xs: 14 }}>
        <CompareTable />
      </Box>
    </Box>
  );
}
