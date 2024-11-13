// mui
import { Box, Table, TableRow, TableBody, TableCell, TableHead, Typography, Skeleton, Stack } from '@mui/material';
//components
import RootStyled from 'src/components/lists/checkoutProduct/styled';

// ----------------------------------------------------------------------

export default function CartProductListSkeleton() {
  return (
    <RootStyled>
      <Table>
        <TableHead>
          <TableRow className="table-head-row">
            <TableCell>
              <Skeleton variant="text" width={100} />{' '}
            </TableCell>
            <TableCell align="center">
              <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} />
            </TableCell>
            <TableCell align="center">
              <Skeleton variant="text" width={63} sx={{ mx: 'auto' }} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" width={44} sx={{ ml: 'auto' }} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from(new Array(3)).map((i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Box className="product-sec">
                    <Skeleton variant="rounded" width={56} height={56} sx={{ mr: 2 }} />
                    <Box>
                      <Typography
                        noWrap
                        variant="subtitle1"
                        className="subtitle"
                        lineHeight={1}
                        mb={0 + '!important'}
                        paddingY={0.7}
                      >
                        <Skeleton variant="text" width={150} />
                      </Typography>

                      <Stack>
                        <Stack direction="row" gap={2}>
                          <Skeleton variant="text" width={60} />
                          <Skeleton variant="text" width={60} />
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    '& > div': {
                      mx: 'auto'
                    }
                  }}
                >
                  <Stack width={96} sx={{ mx: 'auto' }}>
                    <Skeleton variant="rounded" width={96} height={36} />
                    <Skeleton variant="rounded" width={40} height={12} sx={{ ml: 'auto', mt: 0.5 }} />
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="text" width={52} sx={{ mx: 'auto' }} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="circular" width={40} height={40} sx={{ ml: 'auto' }} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </RootStyled>
  );
}
