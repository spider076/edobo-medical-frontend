import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { useRouter } from 'next-nprogress-bar';

// mui
import { TableRow, Skeleton, TableCell, Stack, IconButton, Tooltip, useTheme } from '@mui/material';

// components
import Label from 'src/components/label';

// hooks
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

// utils
import { fDateShort } from 'src/utils/formatTime';

// icons
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

export default function BrandsRow({ isLoading, row, handleClickOpen }) {
  const fCurrency = useCurrencyFormatter();
  const router = useRouter();
  const theme = useTheme();
  return (
    <TableRow hover key={Math.random()}>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : row.name}</TableCell>

      <TableCell>{isLoading ? <Skeleton variant="text" /> : <> {row?.products?.length} products </>}</TableCell>

      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <> {row.discountType === 'percent' ? row.discount + '%' : fCurrency(row.discount)} </>
        )}
      </TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : fDateShort(row.startDate)}</TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : fDateShort(row.endDate)}</TableCell>

      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={row?.status?.toLowerCase() === 'enable' ? 'success' : 'error'}
          >
            {capitalize(row?.status)}
          </Label>
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
                <IconButton onClick={() => router.push(`/admin/compaigns/${row?.slug}`)}>
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
BrandsRow.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    country: PropTypes.string,
    code: PropTypes.string,
    rate: PropTypes.string
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired
};
