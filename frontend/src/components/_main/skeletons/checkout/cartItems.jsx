// mui
import { Card, CardContent, Stack, Box, Typography, Skeleton } from '@mui/material';

export default function CardItemSekelton() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h4" mb={1}>
          <Skeleton variant="text" />
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} py={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Skeleton variant="rounded" width={64} height={64} />

            <Box>
              <Typography variant="subtitle1" noWrap>
                <Skeleton variant="text" width={160} />
              </Typography>
              <Stack direction="row" gap={1}>
                <Typography
                  variant="body2"
                  sx={{
                    span: {
                      color: 'text.secondary',
                      textTransform: 'capitalize'
                    }
                  }}
                >
                  <Skeleton variant="text" width={80} />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    span: {
                      color: 'text.secondary'
                    }
                  }}
                >
                  <Skeleton variant="text" width={80} />
                </Typography>
              </Stack>
              <Typography variant="body2">
                <Skeleton variant="text" width={120} />
              </Typography>
            </Box>
          </Stack>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={60} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
