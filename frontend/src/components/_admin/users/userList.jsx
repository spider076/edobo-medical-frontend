'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
// component
import Table from 'src/components/table/table';
import UserList from 'src/components/table/rows/usersList';
import RoleDialog from 'src/components/dialog/role';

const TABLE_HEAD = [
  { id: 'name', label: 'User', alignRight: false, sort: true },
  { id: 'email', label: 'Email', alignRight: false, sort: true },
  { id: 'phone', label: 'phone', alignRight: false, sort: false },
  { id: 'orders', label: 'Orders', alignRight: false, sort: true },
  { id: 'role', label: 'Role', alignRight: false, sort: true },
  { id: 'joined', label: 'Joined', alignRight: false, sort: true },

  { id: '', label: 'Actions', alignRight: true }
];

export default function AdminProducts() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [count, setCount] = useState(0);

  const { data, isLoading } = useQuery(
    ['user', pageParam, searchParam, count],
    () => api.getUserByAdminsByAdmin(+pageParam || 1, searchParam || ''),
    {
      onError: (err) => {
        toast.error(err.response.data.message || 'Something went wrong!');
      }
    }
  );
  const [id, setId] = useState(null);

  const { mutate, isLoading: roleLoading } = useMutation(api.updateUserRoleByAdmin, {
    onSuccess: (data) => {
      toast.success(data.message);
      setCount((prev) => prev + 1);
      setId(null);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      setId(null);
    }
  });

  return (
    <>
      <RoleDialog open={Boolean(id)} onClose={() => setId(null)} onClick={() => mutate(id)} loading={roleLoading} />
      <Table headData={TABLE_HEAD} data={data} isLoading={isLoading} row={UserList} setId={setId} id={setId} isSearch />
    </>
  );
}
