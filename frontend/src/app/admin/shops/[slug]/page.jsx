'use client';
import React from 'react';
import PropTypes from 'prop-types';

// mui
import { useTheme } from '@mui/material';

// components
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ShopDetail from 'src/components/_admin/shops/shopDetail';
import ShopIcomeList from '../../../../components/_admin/shops/shopIncome';

// icons
import { FaGifts } from 'react-icons/fa6';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { TbChartArrowsVertical } from 'react-icons/tb';
import { FaWallet } from 'react-icons/fa6';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

Page.propTypes = {
  params: PropTypes.object.isRequired
};

export default function Page({ params: { slug } }) {
  const theme = useTheme();
  const [count, setCount] = React.useState(0);
  const { data, isLoading } = useQuery(['shop-by-admin', count], () => api.getShopDetailsByAdmin(slug));

  const dataMain = [
    {
      name: 'Total Income',
      items: data?.totalEarnings,
      color: theme.palette.error.main,
      icon: <FaWallet size={30} />
    },
    {
      name: 'Total Commission',
      items: data?.totalCommission,
      color: theme.palette.success.main,
      icon: <TbChartArrowsVertical size={30} />
    },

    {
      name: 'Total Orders',
      items: data?.totalOrders,
      color: theme.palette.secondary.main,
      icon: <HiOutlineClipboardList size={30} />
    },

    {
      name: 'Total Products',
      items: data?.totalProducts,
      color: theme.palette.primary.main,
      icon: <FaGifts size={30} />
    }
  ];
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <ShopDetailCover data={data?.data} isLoading={isLoading} />
      <ShopDetail data={dataMain} isLoading={isLoading} />
      <ShopIcomeList slug={slug} onUpdatePayment={() => setCount((prev) => prev + 1)} count={count} />
    </div>
  );
}
