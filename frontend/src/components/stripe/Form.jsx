import PropTypes from 'prop-types';
// stripe
import { CardElement } from '@stripe/react-stripe-js';
// components
import CheckoutError from './Error';
// mui
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CheckoutForm = ({ error }) => {
  const theme = useTheme();

  const handleCardDetailsChange = (ev) => {
    ev.error ? 'Error' : null;
  };

  const iframeStyles = {
    base: {
      color: theme.palette.text.primary,
      fontSize: '16px',
      iconColor: theme.palette.text.primary,
      '::placeholder': {
        color: theme.palette.text.secondary
      }
    },
    invalid: {
      iconColor: theme.palette.error.main,
      color: theme.palette.error.main
    },
    complete: {
      iconColor: theme.palette.success.main,
      color: theme.palette.text.primary
    }
  };

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <>
      <Paper
        sx={{
          height: 40,
          borderRadius: '4px',
          bgcolor: 'background.default',
          boxShadow: 'none',
          border: (theme) => '1px solid ' + theme.palette.divider,
          display: 'flex',
          alignItems: 'center',
          '& .StripeElement': {
            width: '100%',
            padding: '15px'
          }
        }}
      >
        <CardElement options={cardElementOpts} onChange={handleCardDetailsChange} />
      </Paper>
      {error && <CheckoutError>{error}</CheckoutError>}
    </>
  );
};

CheckoutForm.propTypes = {
  error: PropTypes.string
};

export default CheckoutForm;
