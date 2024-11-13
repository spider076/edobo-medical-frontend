import PropTypes from 'prop-types';

// mui
import { Alert } from '@mui/material';
import { alpha } from '@mui/material/styles';

const CheckoutError = ({ children }) => (
  <Alert sx={{ bgcolor: (theme) => alpha(theme.palette.error.main, 0.2), mt: 1 }} severity="error">
    {children}
  </Alert>
);

export default CheckoutError;

CheckoutError.propTypes = {
  children: PropTypes.node.isRequired
};
