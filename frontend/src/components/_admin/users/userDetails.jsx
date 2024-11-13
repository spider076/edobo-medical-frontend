'use client';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// mui-ui components
import { Card } from '@mui/material';
// component
import Table from 'src/components/table/table';
import OrderList from 'src/components/table/rows/orderList';
import ProfileCover from 'src/components/_main/profile/profileCover';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

UserProfile.propTypes = {
  id: PropTypes.string.isRequired
};

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false, sort: true },
  { id: 'inventoryType', label: 'Status', alignRight: false, sort: true },
  { id: 'price', label: 'Price', alignRight: false, sort: true },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: '', label: 'Actions', alignRight: true }
];
export default function UserProfile({ id }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isLoading } = useQuery(
    ['user-details', id, pageParam],
    () => api.getUserByAdmin(id + `?page=${pageParam || 1}`),
    {
      enabled: Boolean(id),
      retry: false
    }
  );
  const user = (function () {
    if (isLoading) {
      return null;
    } else {
      console.log(data, 'dadsasdas');
      const { user } = data;
      return user;
    }
  })();
  const orders = (function () {
    if (isLoading) {
      return null;
    } else {
      const { orders } = data;
      return orders;
    }
  })();
  const tableData = { data: orders, count: data?.count };

  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative'
        }}
      >
        <ProfileCover data={user} isLoading={isLoading} />
      </Card>

      <Table headData={TABLE_HEAD} data={tableData} isLoading={isLoading} row={OrderList} isUser />
    </>
  );
}
