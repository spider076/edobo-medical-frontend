import React from 'react';
// component
import VerifyOTPForm from 'src/components/forms/otp';
import PropTypes from 'prop-types';

OTPMain.propTypes = {
  user: PropTypes.object.isRequired
};

export default function OTPMain({ user }) {
  return (
    <>
      <VerifyOTPForm user={user} />
    </>
  );
}
