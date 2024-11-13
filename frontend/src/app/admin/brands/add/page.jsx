import React from 'react';

// components
import AddBrand from 'src/components/_admin/brands/addBrand';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Brands List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Brands',
            href: '/admin/brands'
          },
          {
            name: 'Add brand'
          }
        ]}
      />
      <AddBrand />
    </div>
  );
}
