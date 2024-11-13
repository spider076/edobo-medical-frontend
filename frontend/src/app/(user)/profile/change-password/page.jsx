import React from 'react';

// mui
import { Card, Container, Stack, Typography } from '@mui/material';

// next
import dynamic from 'next/dynamic';

// components
import ChangePasswordSkeleton from 'src/components/_main/skeletons/auth/change-password/change-password';
import BreadcrumbsSkeleton from 'src/components/_main/skeletons/products/breadcrumbs';

// Meta information
export const metadata = {
  title: 'Change Password | Nextall - Update Your Account Password Securely',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

// components
const HeaderBreadcrumbs = dynamic(() => import('src/components/headerBreadcrumbs'), {
  loading: () => <BreadcrumbsSkeleton />
});
const AccountChangePassword = dynamic(() => import('src/components/_main/profile/edit/accountChangePassword'), {
  loading: () => <ChangePasswordSkeleton />
});

export default function ChangePassword() {
  return (
    <Container>
      <HeaderBreadcrumbs
        heading="Change Password"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Profile',
            href: '/profile/change-password'
          },
          {
            name: 'Change Password'
          }
        ]}
      />
      <Card
        sx={{
          maxWidth: 560,
          m: 'auto',
          my: '80px',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3
        }}
      >
        <Stack mb={5}>
          <Typography textAlign="center" variant="h4" component="h1" gutterBottom>
            Change Password
          </Typography>
          <Typography textAlign="center" color="text.secondary">
            Change your password by logging into your account.
          </Typography>
        </Stack>
        <AccountChangePassword />
      </Card>
    </Container>
  );
}
