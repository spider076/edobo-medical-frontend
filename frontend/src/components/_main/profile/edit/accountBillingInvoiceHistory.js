import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

// mui
import { Stack, Button, Typography, Card, Divider, Box, Skeleton } from '@mui/material';
// icons
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// utils
import { fDate } from 'src/utils/formatTime';
// api
import * as api from 'src/services';

// AccountBillingInvoiceHistory.propTypes = {
//   invoices: PropTypes.array
// };

export default function AccountBillingInvoiceHistory() {
  const router = useRouter();
  const { data, isLoading } = useQuery('invoices', api.getInvoices);
  return (
    <Card
      sx={{
        p: 3,
        width: 1,
        position: 'sticky',
        top: '80px',
        display: { md: 'block', xs: 'none' }
      }}
    >
      <Stack spacing={3} alignItems="flex-end">
        <Typography variant="overline" sx={{ color: 'text.secondary', width: 1 }}>
          Invoice History
        </Typography>
        <Stack spacing={2} sx={{ width: 1 }}>
          {(isLoading ? Array.from(new Array(5)) : data?.data.slice(0, 5)).map((invoice) => (
            <Box key={Math.random()}>
              <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 160 }}>
                  {isLoading ? <Skeleton variant="text" /> : fDate(invoice.createdAt)}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 1.5 }} />
            </Box>
          ))}
        </Stack>
        {isLoading ? (
          <Skeleton variant="text" height={32} width={100} />
        ) : (
          <Button
            size="small"
            onClick={() => router.push('/profile/wishlist')}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            All invoices
          </Button>
        )}
      </Stack>
    </Card>
  );
}
