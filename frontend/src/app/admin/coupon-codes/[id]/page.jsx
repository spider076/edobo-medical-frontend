'use client';
import React from 'react';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditCouponCode from 'src/components/_admin/couponCodes/editCouponCode';
import * as api from 'src/services';
// usequery
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};
export default function Page({ params }) {
  const { data, isLoading } = useQuery(['coupon-codes'], () => api.getCouponCodeByAdmin(params.id), {
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong!');
    }
  });
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Categories List"
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
            name: 'Edit Coupon'
          }
        ]}
      />
      <EditCouponCode data={data?.data} isLoading={isLoading} />
    </div>
  );
}
