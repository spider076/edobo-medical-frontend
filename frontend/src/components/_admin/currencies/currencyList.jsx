'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
// api
import * as api from 'src/services';
// usequery
import { useQuery } from 'react-query';
// mui
import { Dialog } from '@mui/material';
// components
import DeleteDialog from 'src/components/dialog/delete';
import Table from 'src/components/table/table';
import Currency from 'src/components/table/rows/currency';

const TABLE_HEAD = [
  { id: 'name', label: 'Currency', alignRight: false, sort: true },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'rate', label: 'Rate', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },

  { id: '', label: 'Actions', alignRight: true }
];

export default function BrandList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading, error } = useQuery(
    ['brands', apicall, searchParam, pageParam],
    () => api.getCurrenciesByAdmin(+pageParam || 1, searchParam || ''),
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
          endPoint="deleteCurrencyByAdmin"
          type={'Currency deleted'}
          deleteMessage={
            'Are you sure you want to delete this currency? Please consider carefully before making irreversible changes.'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={error ? [] : data}
        isLoading={isLoading}
        row={Currency}
        handleClickOpen={handleClickOpen}
        isSearch
      />
    </>
  );
}
