import React from 'react';
import PropTypes from 'prop-types';
import { fDate } from 'src/utils/formatTime';
import { useRouter } from 'next-nprogress-bar';

// mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Avatar, IconButton, Tooltip } from '@mui/material';

// components
import Label from 'src/components/label';
import BlurImage from 'src/components/blurImage';

// icons
import { IoEye } from 'react-icons/io5';

OrderRowas.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        imageUrl: PropTypes.stringisRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['delivered', 'ontheway', 'pending']).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired
};

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 44,
  height: 44,
  minWidth: 44,
  objectFit: 'cover',
  margin: theme.spacing(1),
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden'
}));
export default function OrderRowas({ ...props }) {
  const { isLoading, row } = props;
  const router = useRouter();
  const theme = useTheme();
  return (
    <TableRow
      hover
      onClick={() => router.push(`/order/${row._id}`)}
      sx={{
        cursor: 'pointer'
      }}
    >
      <TableCell component="th" padding="none">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: 300
          }}
        >
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={44}
              height={44}
              sx={{ borderRadius: 1, margin: (theme) => theme.spacing(0, 1) }}
            />
          ) : row?.items.length > 0 ? (
            <ThumbImgStyle>
              <BlurImage priority fill alt={row?.items[0].fullName} src={row?.items[0].imageUrl} objectFit="cover" />
            </ThumbImgStyle>
          ) : (
            <Avatar>{row?.items[0]?.name}</Avatar>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row?.items[0]?.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell> {isLoading ? <Skeleton variant="text" /> : row?.items.length}</TableCell>
      <TableCell>
        {' '}
        {/* type error */}
        {isLoading ? <Skeleton variant="text" /> : row?.total}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              (row?.status === 'delivered' && 'success') ||
              (row?.status === 'ontheway' && 'warning') ||
              (row?.status === 'pending' && 'info') ||
              'error'
            }
          >
            {row?.status}
          </Label>
        )}
      </TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : <>{fDate(row?.createdAt)}</>}</TableCell>
      <TableCell align="right">
        {isLoading ? (
          <Skeleton variant="circular" width={34} height={34} />
        ) : (
          <Tooltip title="Preview">
            <IconButton onClick={() => router.push(`/order/${row._id}`)}>
              <IoEye />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
