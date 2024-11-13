import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';

// mui
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip } from '@mui/material';

// components
import { fDateShort } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';

// icons
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

CategoryRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    expire: PropTypes.instanceOf(Date).isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired
};

function isExpired(expirationDate) {
  const currentDateTime = new Date();
  return currentDateTime >= new Date(expirationDate);
}
export default function CategoryRow({ isLoading, row, handleClickOpen }) {
  const router = useRouter();
  return (
    <TableRow hover key={Math.random()}>
      <TableCell component="th" scope="row">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="subtitle2" noWrap textTransform="capitalize">
            {isLoading ? <Skeleton variant="text" width={120} /> : row?.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" width={80} /> : row?.code}</TableCell>

      <TableCell
        sx={{
          textTransform: 'capitalize'
        }}
      >
        {isLoading ? <Skeleton variant="text" /> : row.type}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : row.type === 'percent' ? (
          row.discount + '%'
        ) : (
          fCurrency(row.discount)
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" width={50} />
        ) : isExpired(row.expire) ? (
          'Expired'
        ) : (
          fDateShort(row.expire)
        )}
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <>
              <Skeleton variant="circular" width={34} height={34} sx={{ mr: 1 }} />
              <Skeleton variant="circular" width={34} height={34} />
            </>
          ) : (
            <>
              <Tooltip title="Edit">
                <IconButton onClick={() => router.push(`/admin/coupon-codes/${row?._id}`)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen(row._id)}>
                  <MdDelete />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
