'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSelector } from 'react-redux';

// mui
import { Container } from '@mui/material';

// components
import ShopForm from 'src/components/forms/userShop';

export default function Page() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.role === 'vendor' || user?.role?.includes('admin')) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth="xl">
      <ShopForm />
    </Container>
  );
}
