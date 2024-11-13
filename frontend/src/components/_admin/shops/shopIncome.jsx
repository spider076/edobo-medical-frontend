'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
// components
import Table from 'src/components/table/table';
import IncomeList from 'src/components/table/rows/income';
import EditPaymentDialog from 'src/components/dialog/editPayment';

// mui
import { Typography } from '@mui/material';
const TABLE_HEAD = [
  //   { id: 'name', label: 'Shop', alignRight: false },
  { id: 'items', label: 'Sale', alignRight: false, sort: true },
  { id: 'total', label: 'Total', alignRight: false, sort: true },
  { id: 'earning', label: 'Total Income', alignRight: false, sort: true },
  { id: 'commission', label: 'commission', alignRight: false, sort: true },

  { id: 'status', label: 'status', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Created', alignRight: false },
  { id: '', label: 'actions', alignRight: true }
];
export default function ShopIcomeList({ slug, onUpdatePayment, isVendor }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [payment, setPayment] = useState(null);
  const [count, setCount] = useState(0);
  const { data, isLoading: loadingList } = useQuery(
    ['income', pageParam, count],
    () => api[isVendor ? 'getIncomeByVendor' : 'getShopIncomeByAdmin'](slug, pageParam),
    {
      onSuccess: () => onUpdatePayment(),
      onError: (err) => toast.error(err.response.data.message || 'Something went wrong!')
    }
  );

  const isLoading = loadingList;

  return (
    <>
      <Typography variant="h5" color="text.primary" my={2}>
        Income Report
      </Typography>

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={IncomeList}
        handleClickOpen={(v) => setPayment(v)}
        isVendor={isVendor}
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
ShopIcomeList.propTypes = {
  isVendor: PropTypes.boolean,
  slug: PropTypes.string,
  onUpdatePayment: PropTypes.func
};
