// pages/terms-and-conditions.js

import React from 'react';

// mui
import { Container, Typography } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
const TermsAndConditions = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <HeaderBreadcrumbs
        heading="Terms and conditions"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Terms and conditions'
          }
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom pt={3}>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Nextall! These terms and conditions outline the rules and regulations for the use of Nextall's
        Website.
      </Typography>
      <Typography variant="body1" paragraph>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use Nextall if you
        do not agree to take all of the terms and conditions stated on this page.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        License
      </Typography>
      <Typography variant="body1" paragraph>
        Unless otherwise stated, Nextall and/or its licensors own the intellectual property rights for all material on
        Nextall. All intellectual property rights are reserved. You may access this from Nextall for your own personal
        use subjected to restrictions set in these terms and conditions.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        User Comments
      </Typography>
      <Typography variant="body1" paragraph>
        Certain parts of this website offer the opportunity for users to post and exchange opinions and information in
        certain areas of the website. Nextall does not filter, edit, publish or review Comments prior to their presence
        on the website. Comments do not reflect the views and opinions of Nextall, its agents, and/or affiliates.
        Comments reflect the views and opinions of the person who post their views and opinions.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Hyperlinking to our Content
      </Typography>
      <Typography variant="body1" paragraph>
        The following organizations may link to our Website without prior written approval:
      </Typography>
      <ul>
        <li>Government agencies</li>
        <li>Search engines</li>
        <li>News organizations</li>
        <li>
          Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of
          other listed businesses
        </li>
        <li>
          System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
          charity fundraising groups which may not hyperlink to our Web site
        </li>
      </ul>
      <Typography variant="h6" component="h2" gutterBottom>
        iFrames
      </Typography>
      <Typography variant="body1" paragraph>
        Without prior approval and written permission, you may not create frames around our Webpages that alter in any
        way the visual presentation or appearance of our Website.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Content Liability
      </Typography>
      <Typography variant="body1" paragraph>
        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend
        us against all claims that is rising on your Website. No link(s) should appear on any Website that may be
        interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the
        infringement or other violation of, any third party rights.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Your Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        Please read our Privacy Policy.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Reservation of Rights
      </Typography>
      <Typography variant="body1" paragraph>
        We reserve the right to request that you remove all links or any particular link to our Website. You approve to
        immediately remove all links to our Website upon request. We also reserve the right to amen these terms and
        conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to
        and follow these linking terms and conditions.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Removal of links from our website
      </Typography>
      <Typography variant="body1" paragraph>
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any
        moment. We will consider requests to remove links but we are not obligated to or so or to respond to you
        directly.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Disclaimer
      </Typography>
      <Typography variant="body1" paragraph>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
        relating to our website and the use of this website. Nothing in this disclaimer will:
      </Typography>
      <ul>
        <li>limit or exclude our or your liability for death or personal injury;</li>
        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
      </ul>
      <Typography variant="body1" paragraph>
        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are
        subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
        liabilities arising in contract, in tort and for breach of statutory duty.
      </Typography>
      <Typography variant="body1" paragraph>
        As long as the website and the information and services on the website are provided free of charge, we will not
        be liable for any loss or damage of any nature.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
