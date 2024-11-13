import PropTypes from 'prop-types';
// mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  Skeleton,
  Stack
} from '@mui/material';
import { IoClose } from 'react-icons/io5';

//components
import RootStyled from './styled';
import Incrementer from 'src/components/incrementer';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import BlurImage from 'src/components/blurImage';

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden'
}));

// ----------------------------------------------------------------------

export default function CartProductList({ ...props }) {
  const { onDelete, onIncreaseQuantity, onDecreaseQuantity, isLoading, cart } = props;
  console.log(props, 'propesss');

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <RootStyled>
      <Table>
        <TableHead>
          <TableRow className="table-head-row">
            <TableCell>{isLoading ? <Skeleton variant="text" width={100} /> : 'Product'}</TableCell>
            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} /> : 'Price'}
            </TableCell>
            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} /> : 'Quantity'}
            </TableCell>

            <TableCell align="center">
              {isLoading ? <Skeleton variant="text" width={63} sx={{ mx: 'auto' }} /> : 'Total Price'}
            </TableCell>
            <TableCell align="right">
              {isLoading ? <Skeleton variant="text" width={44} sx={{ ml: 'auto' }} /> : 'Action'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cart.map((product) => {
            const { sku, name, size, color, quantity, available, price, priceSale, image } = product;

            return (
              <TableRow key={Math.random()}>
                <TableCell>
                  <Box className="product-sec">
                    {isLoading ? (
                      <Skeleton variant="rounded" width={56} height={56} sx={{ mr: 2 }} />
                    ) : (
                      <ThumbImgStyle>
                        <BlurImage priority fill alt="product image" src={image} />
                      </ThumbImgStyle>
                    )}
                    <Box>
                      <Typography
                        noWrap
                        variant="subtitle1"
                        className="subtitle"
                        lineHeight={1}
                        mb={0 + '!important'}
                        paddingY={0.7}
                      >
                        {isLoading ? <Skeleton variant="text" width={150} /> : name}
                      </Typography>

                      <Stack>
                        <Stack direction="row" gap={2}>
                          {isLoading ? (
                            <Skeleton variant="text" width={60} />
                          ) : (
                            <Typography variant="body2" sx={{ span: { textTransform: 'uppercase' } }}>
                              <b>Size:</b> <span>{size}</span>
                            </Typography>
                          )}
                          {isLoading ? (
                            <Skeleton variant="text" width={60} />
                          ) : (
                            <Typography variant="body2" sx={{ span: { textTransform: 'uppercase' } }}>
                              <b>Color:</b> <span>{color}</span>
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="text" width={52} sx={{ mx: 'auto' }} />
                  ) : (
                    <Typography variant="body1" color="text.primary" fontWeight={600}>
                      ${price}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    '& > div': {
                      mx: 'auto'
                    }
                  }}
                >
                  {isLoading ? (
                    <Stack width={96} sx={{ mx: 'auto' }}>
                      <Skeleton variant="rounded" width={96} height={36} />
                      <Skeleton variant="rounded" width={40} height={12} sx={{ ml: 'auto', mt: 0.5 }} />
                    </Stack>
                  ) : (
                    <Incrementer
                      quantity={quantity}
                      available={available}
                      onDecrease={() => onDecreaseQuantity(sku)}
                      onIncrease={() => onIncreaseQuantity(sku)}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {isLoading ? (
                    <Skeleton variant="text" width={52} sx={{ mx: 'auto' }} />
                  ) : (
                    <Typography variant="subtitle2">{fCurrency(cCurrency(quantity * (priceSale || price)))}</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} sx={{ ml: 'auto' }} />
                  ) : (
                    <IconButton aria-label="delete" color="inherit" onClick={() => onDelete(sku)} size="small">
                      <IoClose size={24} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </RootStyled>
  );
}
CartProductList.propTypes = {
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  isLoading: PropTypes.bool,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      available: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      priceSale: PropTypes.number,
      image: PropTypes.string.isRequired
    })
  )
};
