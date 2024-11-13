// mui
import { Box, Stack, Typography, Skeleton } from '@mui/material';

export default function ProductDetailsSumarySkeleton() {
  return (
    <Box>
      <Typography noWrap variant="h4" lineHeight={1} mt={1.5}>
        <Skeleton variant="text" width={200} />
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="body1">
          <Skeleton variant="text" width={200} />
        </Typography>
        <Typography variant="h4" className="text-price">
          <Skeleton variant="text" width={80} />
        </Typography>
      </Stack>
      <Stack spacing={1} my={3}>
        <Stack direction="row" alignItems="center" spacing={1} mt={1.5}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={60} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={400}>
            <Skeleton variant="text" width={80} />
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={80} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={400}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={70} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={400} className="text-discount">
            <Skeleton variant="text" width={120} />{' '}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={80} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={400}>
            <Skeleton variant="text" width={80} />
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} pt={1}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={50} />
          </Typography>
          <Skeleton variant="rounded" width={120} height={35} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} pt={1}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={50} />
          </Typography>
          <Skeleton variant="rounded" width={120} height={35} />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} className="incrementer-wrapper">
        <Typography variant="subtitle1">
          <Skeleton variant="text" width={80} />
        </Typography>

        <Box sx={{ float: 'right' }}>
          <Skeleton variant="rounded" width={120} height={35} />
        </Box>
      </Stack>
      <Stack spacing={2} my={2}>
        <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }} className="contained-buttons">
          <Skeleton variant="rounded" width={'100%'} height={48} />
          <Skeleton variant="rounded" width={'100%'} height={48} />
        </Stack>

        <Stack direction="row" justifyContent="center" spacing={0.5}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Stack>
    </Box>
  );
}
