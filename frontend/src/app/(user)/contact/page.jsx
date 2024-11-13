import React from 'react';
import dynamic from 'next/dynamic';

// mui
import { Container } from '@mui/material';

// component
import ContactUs from 'src/components/_main/contactUs';

import HeaderBreadcrumbsSkeleton from 'src/components/skeletons/breadcrumbs';
// skeleton

const HeaderBreadcrumbs = dynamic(() => import('src/components/headerBreadcrumbs'), {
  loading: () => <HeaderBreadcrumbsSkeleton />
});

export default function Page() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Contact Us"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Contact us'
          }
        ]}
      />
      <ContactUs />
    </Container>
  );
}
