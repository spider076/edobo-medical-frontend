import React from 'react';

// components
import Dashboard from 'src/components/_admin/dashboard';

// Meta information
export const metadata = {
  title: 'Nextall - Dashboard',
  description: 'Welcome to the Nextall Dashboard. Manage your e-commerce operations with ease.',
  applicationName: 'Nextall Dashboard',
  authors: 'Nextall',
  keywords: 'dashboard, e-commerce, management, Nextall',
  icons: {
    icon: '/favicon.png'
  }
};

export default function page() {
  return (
    <>
      <Dashboard />
    </>
  );
}
