'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';

// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// mui
import { TextField, Stack, InputAdornment, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { MdOutlineVisibility } from 'react-icons/md';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';

// ----------------------------------------------------------------------

export default function ResetPasswordForm({ ...props }) {
  const { token } = props;
  const { push } = useRouter();
  const [loading, setloading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { mutate } = useMutation(api.resetPassword, {
    onSuccess: () => {
      setloading(false);
      push('/auth/login');
      toast.success('Password successfully updated.');
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message || 'Reset failed. try again');
    }
  });

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Short password').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password is not matched')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setloading(true);
      await mutate({
        newPassword: values.password,
        token
      });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="password" component={'label'}>
              Password
            </Typography>
            <TextField
              id="password"
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock size={24} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="confirmPassword" component={'label'}>
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...getFieldProps('confirmPassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock size={24} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {showConfirmPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Save
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired
};
