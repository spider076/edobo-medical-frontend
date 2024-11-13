import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import OrdersList from 'src/components/_admin/orders/ordersList';

// api
import * as api from 'src/services';
// Meta information
export const metadata = {
  title: 'Order - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};
export default async function page() {
  const { data: shops } = await api.getAllShopsByAdmin();
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Orders List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Orders'
          }
        ]}
      />
      <OrdersList shops={shops} />
    </div>
  );
}
