'use client';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

// mui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Grid, Typography, Box, Stack, IconButton, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// images and Icons
import { MdClear } from 'react-icons/md';
import subscriptionImg from '../../../../../public/images/subscription-img.png';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Subscription() {
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('subscriptionDismissedAt', Date.now().toString());
  };
  // useEffect to open the dialog when the component mounts
  React.useEffect(() => {
    const dismissedAt = localStorage.getItem('subscriptionDismissedAt');
    if (dismissedAt) {
      const timeSinceDismissed = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismissed < ONE_DAY_IN_MS) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000); //

    return () => clearTimeout(timer);
  }, []);

  //   api integrate
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      if (
        values.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setloading(true);
        mutate(values);
      } else {
        toast.error('Invalid email!');
      }
    }
  });

  const { mutate } = useMutation(api.sendNewsletter, {
    onSuccess: (data) => {
      toast.success(data.message);
      setloading(false);
      formik.resetForm();
      handleClose();
    },
    onError: (err) => {
      setloading(false);
      toast.error(err.response.data.message);
    }
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleClose}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: 500,
                width: '100%',
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Image
                priority
                src={subscriptionImg}
                alt="subscribe"
                sizes="300px"
                placeholder="blur"
                fill
                objectFit="cover"
                static
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <DialogContent>
              <Box
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5
                }}
              >
                <IconButton onClick={handleClose}>
                  <MdClear size={20} />
                </IconButton>
              </Box>
              <Stack spaceing={2} textAlign="center" mb={4}>
                <Typography variant="h4">Sign up to Nextgater</Typography>
                <DialogContentText>
                  Enter your email address to subscribe our notification of our new post & features by email.
                </DialogContentText>
              </Stack>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField size="large" placeholder="Enter your Email" {...getFieldProps('email')} />

                    <LoadingButton
                      variant="contained"
                      size="large"
                      color="primary"
                      type="submit"
                      loading={loading}
                      sx={{ marginTop: 8, paddingX: 4 }}
                    >
                      Subscribe
                    </LoadingButton>
                    <Button variant="text" size="large" color="inherit" onClick={handleClose}>
                      No Thanks
                    </Button>
                  </Stack>
                </Form>
              </FormikProvider>
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
