import React from 'react';
// mui
import { Box, Card, Skeleton, TableContainer, Table } from '@mui/material';
// components
import TableBodyMain from './tableBody';
import TableHeadMain from './tableHead';

export default function index() {
  return (
    <Box mt={3}>
      <Card sx={{ padding: '8px 16px' }}>
        <TableContainer>
          <Table size="small">
            <TableHeadMain />
            {Array.from(new Array(3)).map((index) => (
              <React.Fragment key={index}>
                <TableBodyMain />
              </React.Fragment>
            ))}
          </Table>
        </TableContainer>
      </Card>
      <Box mt={3}>
        <Skeleton variant="rounded" width={114} height={32} sx={{ margin: 'auto' }} />
      </Box>
    </Box>
  );
}
