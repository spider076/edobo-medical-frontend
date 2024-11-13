import React from 'react';

// mui
import { Container } from '@mui/material';

// next
import dynamic from 'next/dynamic';

// components
import CheckoutMain from 'src/components/_main/checkout';
import HeaderBreadcrumbsSkeleton from 'src/components/skeletons/breadcrumbs';

// dynamic import
const HeaderBreadcrumbs = dynamic(() => import('src/components/headerBreadcrumbs'), {
  loading: () => <HeaderBreadcrumbsSkeleton />
});

// Meta information
export const metadata = {
  title: 'Checkout | Nextall - Secure and Convenient Checkout for Your Shopping',
  description:
    'Complete your purchase with confidence on Nextall. Enjoy a secure and convenient checkout process for your shopping needs. Enter your payment and shipping information with ease. Experience seamless transactions and fast delivery. Start your checkout now!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords:
    'checkout, Nextall, secure checkout, convenient checkout, complete purchase, payment information, shipping information, seamless transactions, fast delivery, secure payment, easy checkout, hassle-free checkout, online shopping checkout'
};

export default function Checkout() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Checkout"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Cart',
            href: '/cart'
          },
          {
            name: 'Checkout'
          }
        ]}
      />

      <CheckoutMain />
    </Container>
  );
}
