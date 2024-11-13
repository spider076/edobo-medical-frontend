'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

// mui
import { Dialog } from '@mui/material';

// components
import DeleteDialog from 'src/components/dialog/delete';
import Table from 'src/components/table/table';
import CouponCode from 'src/components/table/rows/couponCode';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false, sort: true },
  { id: 'coupon', label: 'Coupon code', alignRight: false, sort: true },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'discount', label: 'Discount', alignRight: false, sort: true },
  { id: 'expire', label: 'Expire', alignRight: false, sort: true },
  { id: '', label: 'actions', alignRight: true }
];

// ----------------------------------------------------------------------
export default function Catgeories() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading } = useQuery(
    ['coupon-codes', apicall, searchParam, pageParam],
    () => api.getCouponCodesByAdmin(+pageParam || 1, searchParam || ''),
    {
      onError: (err) => toast.error(err.response.data.message || 'Something went wrong!')
    }
  );

  const handleClickOpen = (prop) => () => {
    setId(prop);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteCouponCodeByAdmin"
          type={'Coupon code deleted'}
          deleteMessage={'Are you sure you want Delete to Coupon Code!'}
        />
      </Dialog>

      <HeaderBreadcrumbs
        admin
        heading="Coupon codes"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Coupon codes'
          }
        ]}
        action={{
          href: `/admin/coupon-codes/add`,
          title: 'Add Coupon code'
        }}
      />
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={CouponCode}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}
