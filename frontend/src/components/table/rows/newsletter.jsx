import React from 'react';
import PropTypes from 'prop-types';
import { enUS } from 'date-fns/locale';

// mui
import { Box, TableRow, Skeleton, TableCell, Typography, IconButton, Tooltip } from '@mui/material';

// utils
import { fDateTime } from 'src/utils/formatTime';

// icons
import { MdContentCopy } from 'react-icons/md';

Newsletter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  onClickCopy: PropTypes.func.isRequired
};

export default function Newsletter({ isLoading, row, onClickCopy }) {
  return (
    <TableRow hover key={Math.random()}>
      <TableCell component="th" scope="row">
        <Box>
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row.email}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : <> {fDateTime(row.createdAt, enUS)} </>}</TableCell>
      <TableCell align="right">
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} sx={{ ml: 'auto' }} />
        ) : (
          <Tooltip title="Copy Email">
            <IconButton
              aria-label="copy"
              onClick={() => {
                navigator.clipboard.writeText(row.email);
                onClickCopy();
              }}
            >
              <MdContentCopy />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
