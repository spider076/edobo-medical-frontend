// pages/refund-return-policy.js

import React from 'react';

// mui
import { Container, Typography } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

const RefundReturnPolicy = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <HeaderBreadcrumbs
        heading="Refund and return policy"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Refund and return policy'
          }
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom pt={3}>
        Refund and Return Policy
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for shopping at Nextall. If you are not entirely satisfied with your purchase, we're here to help.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Returns
      </Typography>
      <Typography variant="body1" paragraph>
        You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your
        item must be unused and in the same condition that you received it. Your item must be in the original packaging
        and you need to have the receipt or proof of purchase.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Refunds
      </Typography>
      <Typography variant="body1" paragraph>
        Once we receive your item, we will inspect it and notify you that we have received your returned item. We will
        immediately notify you on the status of your refund after inspecting the item.
      </Typography>
      <Typography variant="body1" paragraph>
        If your return is approved, we will initiate a refund to your credit card (or original method of payment). You
        will receive the credit within a certain amount of days, depending on your card issuer's policies.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Shipping
      </Typography>
      <Typography variant="body1" paragraph>
        You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are
        non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions on how to return your item to us, contact us at support@nextall.com.
      </Typography>
    </Container>
  );
};

export default RefundReturnPolicy;
