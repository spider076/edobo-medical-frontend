import React from 'react';

// components
import AdminShopForm from 'src/components/forms/adminShop';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function Page() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Dashboard"
        admin
        links={[
          {
            name: 'Admin',
            href: '/admin'
          },
          {
            name: 'Shops',
            href: '/admin/shops'
          },
          {
            name: 'Add'
          }
        ]}
      />
      <AdminShopForm />
    </>
  );
}
