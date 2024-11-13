import React from 'react';

// mui
import { Skeleton, Stack, TableCell, TableRow, Typography, TableBody } from '@mui/material';

export default function TableBodyMain() {
  return (
    <TableBody
      sx={{
        tr: {
          padding: '8px 0px !important'
        }
      }}
    >
      <TableRow sx={{}}>
        <TableCell component="th" padding="none">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="rounded" width={44} height={44} />
            <Typography variant="subtitle2" noWrap>
              <Skeleton variant="text" width={150} />
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">
          <Skeleton variant="text" width={65} />
        </TableCell>
        <TableCell align="center">
          <Skeleton variant="text" width={40} />
        </TableCell>
        <TableCell align="center">
          <Skeleton variant="text" width={40} />
        </TableCell>
        <TableCell align="right">
          <Skeleton variant="text" width={70} sx={{ ml: 'auto' }} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
