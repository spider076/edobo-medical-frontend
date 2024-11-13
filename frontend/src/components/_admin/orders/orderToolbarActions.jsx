'use client';
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

// component
import OrderPDF from 'src/components/_admin/orders/orderPdf';
import OrderStatus from 'src/components/_admin/orders/orderStatus';
// mui
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Box } from '@mui/material';
import { useRouter } from 'next-nprogress-bar';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
// icons
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdOutlineFileDownload } from 'react-icons/md';

OrderToolbarActions.propTypes = {
  data: PropTypes.object.isRequired
};

export default function OrderToolbarActions({ data }) {
  const router = useRouter();
  const { mutate, isLoading: deleteLoading } = useMutation(api.deleteOrderByAdmin, {
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/admin/orders');
    },
    onError: () => {
      toast.error('Something went wrong!');
      router.push('/404');
    }
  });
  return (
    <Box mb={{ sm: 0, xs: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <PDFDownloadLink
          document={<OrderPDF data={data} />}
          fileName={`INVOICE-${data?._id}`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <LoadingButton
              loading={loading}
              variant="contained"
              loadingPosition="start"
              startIcon={<MdOutlineFileDownload />}
              color="info"
            >
              {'download'}
            </LoadingButton>
          )}
        </PDFDownloadLink>
        <LoadingButton
          variant="contained"
          startIcon={<MdOutlineDeleteOutline />}
          onClick={() => mutate(data?._id)}
          loading={deleteLoading}
          loadingPosition="start"
        >
          {'Delete'}
        </LoadingButton>
        <OrderStatus data={data} />
      </Stack>
    </Box>
  );
}
