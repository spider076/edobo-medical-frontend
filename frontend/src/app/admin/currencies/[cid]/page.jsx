'use client';
import React from 'react';
import toast from 'react-hot-toast';

// components
import EditCurrency from 'src/components/_admin/currencies/editCurrency';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function Page({ params }) {
  const { data, isLoading } = useQuery(['get-admin-currency'], () => api.getCurrencyByAdmin(params.cid), {
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong!');
    }
  });
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Currency List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Currencies',
            href: '/admin/currencies'
          },
          {
            name: 'Edit Currency'
          }
        ]}
      />
      <EditCurrency isLoading={isLoading} data={data?.data} />
    </div>
  );
}
