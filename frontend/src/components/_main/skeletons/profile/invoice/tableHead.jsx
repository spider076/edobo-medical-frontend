import React from 'react';
// mui
import { Skeleton, TableCell, TableHead, TableRow } from '@mui/material';

export default function TableHeadMain() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="text" width={65} />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="text" width={40} />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="text" width={50} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" width={40} sx={{ ml: 'auto' }} />
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
