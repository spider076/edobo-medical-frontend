import React from 'react';
import PropTypes from 'prop-types';
import { fCurrency } from 'src/utils/formatNumber';
// mui
import { Box, Card, CardContent, Grid, Stack, Typography, Skeleton } from '@mui/material';
// components
import Label from 'src/components/label';
ShopDetail.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default function ShopDetail({ data, isLoading }) {
  return (
    <Grid container spacing={3}>
      {data.map((v, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack>
                  {/* lineHeight={1.7} */}
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography variant="h4">
                      {isLoading ? (
                        <Skeleton variant="text" width={80} />
                      ) : v.name === 'Total Income' || v.name === 'Total Commission' ? (
                        fCurrency(v.items)
                      ) : (
                        v.items
                      )}
                    </Typography>
                    {v.name === 'Last Month Income' ? (
                      isLoading ? (
                        <Skeleton variant="text" width={50} />
                      ) : (
                        <Label variant={'filled'} color={true ? 'success' : 'error'}>
                          Pending
                        </Label>
                      )
                    ) : (
                      ''
                    )}
                  </Stack>

                  <Typography variant="subtitle1" color="text.secondary">
                    {isLoading ? <Skeleton variant="text" width={120} /> : v.name}
                  </Typography>
                </Stack>
                {isLoading ? (
                  <Skeleton variant="circular" width={56} height={56} />
                ) : (
                  <Box
                    sx={{
                      height: 56,
                      width: 56,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${v.color}`,
                      color: v.color
                    }}
                  >
                    {v.icon}
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
