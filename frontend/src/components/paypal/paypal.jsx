'use client';
import React from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

// paypal
import { PayPalButtons } from '@paypal/react-paypal-js';

PayPalCheckout.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired
};

function PayPalCheckout({ onSuccess, values, total, isValid }) {
  const onApproveHandler = async (data, actions) => {
    await actions.order.capture();

    if (data.paymentID) {
      await onSuccess(data.paymentID);
    } else {
      toast.error('Payment is not successful');
    }
  };

  return (
    <div className="App">
      <PayPalButtons
        style={{
          shape: 'rect',
          layout: 'vertical'
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `${values.email} placed an order from ${values.city}, ${values.state}, ${values.country}`,
                amount: {
                  currency_code: currency,
                  value: total.toFixed(2) // Ensure value is in "xx.xx" format
                }
              }
            ]
          });
        }}
        disabled={!isValid}
        onApprove={onApproveHandler}
      />
    </div>
  );
}

export default PayPalCheckout;
