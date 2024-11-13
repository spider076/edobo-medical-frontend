'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';

// mui
import { Toolbar, Container, Stack, useTheme, Link, Divider, Skeleton } from '@mui/material';

// icons
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';

const UserSelect = dynamic(() => import('src/components/select/userSelect'), {
  ssr: false,
  loading: () => (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton variant="rectangular" width={29.4} height={18.9} sx={{ borderRadius: '4px' }} />
      <Divider orientation="vertical" flexItem />
      <Skeleton variant="rectangular" width={48.4} height={18.9} sx={{ borderRadius: '4px' }} />
    </Stack>
  )
});

export default function UserTopbar() {
  const theme = useTheme();
  const { user, isAuthenticated } = useSelector(({ user }) => user);

  return (
    <Container maxWidth="xl">
      <Toolbar
        sx={{
          minHeight: `36px !important`,
          background: theme.palette.background.default,
          justifyContent: 'space-between',
          display: { xs: 'none', md: 'flex' },
          position: 'static',
          zIndex: 999,
          width: '100%',
          px: '0px!important'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link
            component={NextLink}
            href={'tel:+13866883295'}
            sx={{ color: 'text.primary', fontSize: 14, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <MdOutlinePhone /> +1 386-688-3295
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            component={NextLink}
            href={'mailto:johndoe@yahoo.com'}
            sx={{ color: 'text.primary', fontSize: 14, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <MdOutlineMail /> johndoe@yahoo.com
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <UserSelect />
          {isAuthenticated ? (
            user.role === 'user' && (
              <>
                <Divider orientation="vertical" flexItem />
                <Link
                  component={NextLink}
                  href={isAuthenticated ? '/create-shop' : '/auth/register?redirect=/create-shop'}
                  sx={{ color: 'text.primary', fontSize: 14 }}
                >
                  Become a seller
                </Link>
              </>
            )
          ) : (
            <>
              <Divider orientation="vertical" flexItem />
              <Link
                component={NextLink}
                href={isAuthenticated ? '/create-shop' : '/auth/register?redirect=/create-shop'}
                sx={{ color: 'text.primary', fontSize: 14 }}
              >
                Become a seller
              </Link>
            </>
          )}
        </Stack>
      </Toolbar>
    </Container>
  );
}
