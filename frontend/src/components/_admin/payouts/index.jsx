'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
// components
import Table from 'src/components/table/table';
import PayoutsListRow from 'src/components/table/rows/income';
import EditPaymentDialog from 'src/components/dialog/editPayment';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
const TABLE_HEAD = [
  { id: 'name', label: 'Shop', alignRight: false },
  { id: 'items', label: 'Sale', alignRight: false, sort: true },
  { id: 'total', label: 'Total', alignRight: false, sort: true },
  { id: 'earning', label: 'Total Income', alignRight: false, sort: true },
  { id: 'commission', label: 'commission', alignRight: false, sort: true },
  { id: 'status', label: 'status', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Created', alignRight: false },
  { id: '', label: 'actions', alignRight: true }
];
export default function PayoutsList({ shops }) {
  const searchParams = useSearchParams();

  const [payment, setPayment] = useState(null);
  const [count, setCount] = useState(0);
  const { data, isLoading: loadingList } = useQuery(
    ['payouts', searchParams.toString(), count],
    () => api.getPayoutsByAdmin(searchParams.toString()),
    {
      onError: (err) => toast.error(err.response.data.message || 'Something went wrong!')
    }
  );

  const isLoading = loadingList;
  return (
    <>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={PayoutsListRow}
        handleClickOpen={(v) => setPayment(v)}
        isPayout
        isSearch
        filters={[
          {
            name: 'Shop',
            param: 'shop',
            data: shops
          },
          {
            name: 'Status',
            param: 'status',
            data: [
              {
                name: 'Pending',
                value: 'pending'
              },
              {
                name: 'Paid',
                slug: 'paid'
              },
              {
                name: 'Hold',
                slug: 'hold'
              }
            ]
          }
        ]}
      />
      <EditPaymentDialog
        handleClose={() => setPayment(null)}
        open={Boolean(payment)}
        data={payment}
        setCount={setCount}
      />
    </>
  );
}
