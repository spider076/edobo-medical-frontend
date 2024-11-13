'use client';
import React from 'react';

// components
import ShopSettingMain from 'src/components/_admin/vendor/settings/shopSettings';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function ShopSetting() {
  const { data, isLoading } = useQuery(['get-vendor-dhop'], () => api.getVendorShop(), {
    retry: false
  });
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Categories List"
        links={[
          {
            name: 'Dashboard',
            href: '/'
          },
          {
            name: 'Settings',
            href: '/vendor/settings'
          },
          {
            name: 'Shop Settings'
          }
        ]}
      />
      <ShopSettingMain data={data?.data} isLoading={isLoading} />
    </>
  );
}
