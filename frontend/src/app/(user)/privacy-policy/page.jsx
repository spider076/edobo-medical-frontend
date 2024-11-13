// pages/privacy-policy.js

import React from 'react';

// mui
import { Container, Typography } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <HeaderBreadcrumbs
        heading="Privacy policy"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Privacy policy'
          }
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom pt={3}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Nextall! We are committed to protecting your privacy. This Privacy Policy explains how we collect,
        use, and safeguard your information when you visit our website.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Information Collection
      </Typography>
      <Typography variant="body1" paragraph>
        We collect information that you provide to us directly, such as when you create an account, make a purchase, or
        contact us. This information may include your name, email address, phone number, and payment details.
      </Typography>
      <Typography variant="body1" paragraph>
        Additionally, we automatically collect certain information when you visit our website. This may include your IP
        address, browser type, and browsing activity. This information helps us understand how you use our site and
        improve your experience.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Use of Information
      </Typography>
      <Typography variant="body1" paragraph>
        We use the information we collect to operate and maintain our website, process transactions, and communicate
        with you. We may also use your information to improve our services and for marketing purposes, such as sending
        you promotional emails.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Data Security
      </Typography>
      <Typography variant="body1" paragraph>
        We implement security measures to protect your information from unauthorized access and use. However, please
        note that no method of transmission over the internet or electronic storage is completely secure.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Changes to This Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy
        on our website. You are advised to review this Privacy Policy periodically for any changes.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy, please contact us at privacy@nextall.com.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
