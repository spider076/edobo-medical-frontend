'use client';
import React, { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';

// mui
import { Box, Button, Container, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
// icons
import { CiCircleCheck } from 'react-icons/ci';
// components
import ForgetPasswordForm from 'src/components/forms/forgetPassword';

export default function ForgetPasswordMain() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: () => {
      setloading(false);
      toast.success('Email sent');
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
    }
  });

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          maxWidth: 560,
          m: 'auto',
          my: '80px',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
          '& .full-width-btn': {
            mt: 1
          }
        }}
      >
        {!sent ? (
          <>
            <Typography variant="h3" textAlign="center" paragraph>
              Forget Password
            </Typography>
            <Typography color="text.secondary" mb={5} textAlign="center">
              Please enter the email address associated with your account and We will email you a link to reset your
              password.
            </Typography>

            <ForgetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

            <Button fullWidth size="large" onClick={() => router.push('/auth/login')} className="full-width-btn">
              back
            </Button>
          </>
        ) : (
          <Box textAlign="center">
            <Box
              sx={{
                mb: 5,
                mx: 'auto',
                display: 'inline-block'
              }}
            >
              <CiCircleCheck fontSize={160} />
            </Box>

            <Typography variant="h3" gutterBottom>
              Request Sent
            </Typography>
            <Typography mb={5}>
              Email has been sent to <strong>{email}</strong>.
              <br />
            </Typography>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              onClick={() => mutate({ email, origin: window.location.origin })}
            >
              resend
            </LoadingButton>
            <Button size="large" fullWidth onClick={() => router.push('/auth/login')} className="full-width-btn">
              back
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
}
