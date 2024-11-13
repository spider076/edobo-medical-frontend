'use client';

import React from 'react';
import toast from 'react-hot-toast';

// material ui
import { Box, Stack, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
const ContactUs = () => {
  const [loading, setLoading] = React.useState(false);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email is required').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.number().required('Phone number is required'),
    message: Yup.string().required('Message is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      message: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setTimeout(() => {
          resetForm();
          setLoading(false);
          toast.success('Message sent!');
        }, 1000);
        // mutate({
        //   ...values
        // });
      } catch (error) {
        toast.error(error);
      }
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  // const { mutate } = useMutation(api.contactUs, {
  //   onSuccess: async () => {
  //     resetForm();
  //     setLoading(false);
  //     toast.success('Message sent!');
  //   },
  //   onError: (err) => {
  //     setLoading(false);
  //     toast.error(err.response.data.message);
  //   }
  // });

  return (
    <div>
      {/* from section  */}
      <Stack className="form-section">
        <Box className="form-feed">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={'First Name'}
                    className="text-feed"
                    fullWidth
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={'Last Name'}
                    className="text-feed"
                    fullWidth
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={{ md: 0.1, xs: 0 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={'Your Email'}
                    className="text-feed"
                    fullWidth
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={'Your Phone'}
                    className="text-feed"
                    fullWidth
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={3}>
                <TextField
                  label={'Your Message'}
                  className="text-feed"
                  multiline
                  rows={5}
                  fullWidth
                  {...getFieldProps('message')}
                  error={Boolean(touched?.message && errors?.message)}
                  helperText={touched?.message && errors?.message}
                />
              </Grid>

              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                className="send-btn"
                loading={loading}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                Send Message
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </Stack>
    </div>
  );
};

export default ContactUs;
