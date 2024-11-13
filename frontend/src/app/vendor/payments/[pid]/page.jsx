'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { fDateShort } from 'src/utils/formatTime';

// mui
import { useTheme } from '@mui/material';

//
import Table from 'src/components/table/table';
import OrderList from 'src/components/table/rows/orderList';
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ShopDetail from 'src/components/_admin/shops/shopDetail';

// icons
import { FaWallet } from 'react-icons/fa6';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { TbChartArrowsVertical } from 'react-icons/tb';
import { GrStatusGood } from 'react-icons/gr';
import { GrStatusUnknown } from 'react-icons/gr';
import { CiNoWaitingSign } from 'react-icons/ci';

// api
import { useQuery } from 'react-query';
import * as api from 'src/services';

const TABLE_HEAD = [
  { id: 'name', label: 'User', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false, sort: true },
  { id: 'items', label: 'items', alignRight: false },
  { id: 'inventoryType', label: 'status', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Date', alignRight: false, sort: true },
  { id: '', label: 'actions', alignRight: true }
];

Page.propTypes = {
  params: PropTypes.object.isRequired
};

export default function Page({ params: { pid } }) {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isLoading } = useQuery(['shop-payment', pageParam], () => api.getIncomeDetailsByAdmin(pid, pageParam), {
    onError: (err) => toast.error(err.response.data.message || 'Something went wrong!')
  });

  const dataMain = [
    {
      name: 'Total Income',
      items: data?.payment?.totalIncome,
      color: theme.palette.error.main,
      icon: <FaWallet size={30} />
    },
    {
      name: 'Total Commission',
      items: data?.payment?.totalCommission,
      color: theme.palette.success.main,
      icon: <TbChartArrowsVertical size={30} />
    },

    {
      name: 'Total Orders',
      items: data?.data.total,
      color: theme.palette.secondary.main,
      icon: <HiOutlineClipboardList size={30} />
    },

    {
      name: 'Status ( ' + data?.payment?.status?.toUpperCase() + ' )',
      items: fDateShort(data?.payment?.date || new Date())?.slice(3),
      color: theme.palette.primary.main,
      icon:
        data?.payment?.status === 'paid' ? (
          <GrStatusGood size={30} />
        ) : data?.payment?.status === 'pending' ? (
          <GrStatusUnknown size={30} />
        ) : (
          <CiNoWaitingSign size={30} />
        )
    }
  ];
  return (
    <div>
      <ShopDetailCover data={data?.shop} isLoading={isLoading} />
      <ShopDetail data={dataMain} isLoading={isLoading} />
      <br />
      <Table
        headData={TABLE_HEAD}
        data={data?.data}
        isLoading={isLoading}
        row={OrderList}
        handleClickOpen={() => console.log('clicked')}
      />
    </div>
  );
}
