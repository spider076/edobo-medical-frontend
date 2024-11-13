'use client';
import React from 'react';
import toast from 'react-hot-toast';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditCompaign from 'src/components/_admin/compaigns/editCompaign';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function Page({ params }) {
  const { data, isLoading } = useQuery(['get-admin-compaign'], () => api.getCompaignByAdmin(params.slug), {
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong!');
    }
  });
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
            name: 'Edit Compaign'
          }
        ]}
      />
      <EditCompaign isLoading={isLoading} data={data?.data} />
    </div>
  );
}
