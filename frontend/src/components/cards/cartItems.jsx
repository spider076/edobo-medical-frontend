'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

// mui
import { Card, CardContent, Stack, Box, Divider, Typography, Skeleton } from '@mui/material';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

export default function CheckoutCard({ cart, loading }) {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h4" mb={1}>
          {' '}
          Cart Items
        </Typography>

        {cart.map((value, index, array) => (
          <React.Fragment key={Math.random()}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} py={1}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {loading ? (
                  <Skeleton variant="rounded" width={64} height={64} />
                ) : (
                  <Box
                    sx={{
                      position: 'relative',
                      height: 64,
                      width: 64,
                      borderRadius: '8px',
                      border: '1px solid rgba(145, 158, 171, 0.32)',
                      img: {
                        borderRadius: '8px'
                        // border: "1px solid rgba(145, 158, 171, 0.32)",
                      }
                    }}
                  >
                    <Image priority src={value.image} alt="product" layout="fill" objectFit="cover" />
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle1" noWrap>
                    {loading ? <Skeleton variant="text" width={160} /> : value.name.slice(0, 18)}
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
                      {loading ? (
                        <Skeleton
                          variant="text"
                          width={80}
                          sx={{
                            span: {
                              textTransform: 'uppercase'
                            }
                          }}
                        />
                      ) : (
                        <>
                          <b>Color:</b> <span>{value.color}</span>
                        </>
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        span: {
                          color: 'text.secondary'
                        }
                      }}
                    >
                      {loading ? (
                        <Skeleton
                          variant="text"
                          width={80}
                          sx={{
                            span: {
                              textTransform: 'uppercase'
                            }
                          }}
                        />
                      ) : (
                        <>
                          <b>Size:</b> <span>{value.size}</span>
                        </>
                      )}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      span: {
                        color: 'text.secondary'
                      }
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="text" width={120} />
                    ) : (
                      <>
                        <b>Quantity:</b> <span>{value.quantity}</span>
                      </>
                    )}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="subtitle1">
                {loading ? (
                  <Skeleton variant="text" width={60} />
                ) : (
                  <>{fCurrency(cCurrency(parseInt(value.subtotal)))}</>
                )}
              </Typography>
            </Stack>
            {index !== array.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
CheckoutCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      subtotal: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};
