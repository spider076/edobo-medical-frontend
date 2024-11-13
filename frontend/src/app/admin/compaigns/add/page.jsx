import React from 'react';

// components
import AddCompaign from 'src/components/_admin/compaigns/addCompaign';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Compaigns List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin'
          },
          {
            name: 'Compaigns',
            href: '/admin/compaigns'
          },
          {
            name: 'Add Compaign'
          }
        ]}
      />
      <AddCompaign />
    </div>
  );
}
