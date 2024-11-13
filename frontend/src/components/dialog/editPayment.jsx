import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, FormHelperText } from '@mui/material';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  data: PropTypes.shape({
    _id: PropTypes.string, // Optional for edit scenario
    shop: PropTypes.string.isRequired,
    orders: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    totalIncome: PropTypes.number.isRequired,
    totalCommission: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['pending', 'paid', 'hold']).isRequired,
    paidAt: PropTypes.string, // Optional for paid status
    tip: PropTypes.number // Optional
  }),
  setCount: PropTypes.func
};
export default function FormDialog({ open, handleClose, data, setCount }) {
  const [status, setStatus] = useState(data?.status || 'pending');

  const { mutate, isLoading } = useMutation(api[data?._id ? 'editPaymentByAdmin' : 'createPaymentByAdmin'], {
    onSuccess: () => {
      toast.success('updated');
      setCount((prev) => prev + 1);
      handleClose();
    },
    onError: () => {
      toast.error('Something went wrong!');
    }
  });
  useEffect(() => {
    setStatus(data?.status);
  }, [data]);

  // formik
  const EditPaymentSchema = Yup.object().shape({
    total: Yup.string().required('Total is required'),
    totalIncome: Yup.string().required('Total Income is required'),
    totalCommission: Yup.string().required('Total Commission is required'),
    status: Yup.string().required('Status is required'),
    paidAt: Yup.date().when('eventStartDate', (eventStartDate, schema) => schema.min(new Date(), 'Date is required'))
    // tip: Yup.string().required('Tip is required')
  });
  const formik = useFormik({
    initialValues: {
      total: data?.total || '',
      totalIncome: data?.totalIncome || '',
      totalCommission: data?.totalCommission || '',
      status: data?.status,
      paidAt: data?.paidAt?.split('T')[0],
      tip: data?.tip
    },
    enableReinitialize: true,
    validationSchema: EditPaymentSchema,

    onSubmit: async (event, values) => {
      event.preventDefault();
      const { ...rest } = values;
      await mutate({
        ...rest,
        shop: data.shop,
        orders: data.orders,
        date: data?.date,
        pid: data?._id || null
      });
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: async (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     console.log(formJson);
        //     await mutate({
        //       ...formJson,
        //       shop: data.shop,
        //       orders: data.orders,
        //       date: data?.date,
        //       pid: data?._id || null
        //     });
        //   }
        // }}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates occasionally.
              </DialogContentText>

              <Stack gap={2} mt={4}>
                <Stack gap={2} direction="row">
                  <TextField
                    required
                    id="total"
                    name="total"
                    label="Total"
                    type="number"
                    fullWidth
                    variant="outlined"
                    // defaultValue={data?.total}
                    {...getFieldProps('total')}
                    error={Boolean(touched.total && errors.total)}
                    helperText={touched.total && errors.total}
                  />

                  <TextField
                    required
                    id="totalIncome"
                    name="totalIncome"
                    label="Total Income"
                    type="number"
                    fullWidth
                    variant="outlined"
                    // defaultValue={data?.totalIncome}
                    {...getFieldProps('totalIncome')}
                    error={Boolean(touched.totalIncome && errors.totalIncome)}
                    helperText={touched.totalIncome && errors.totalIncome}
                  />
                </Stack>
                <Stack gap={2} direction="row">
                  <TextField
                    required
                    id="totalCommission"
                    name="totalCommission"
                    label="Total Commission"
                    type="number"
                    fullWidth
                    variant="outlined"
                    // defaultValue={data?.totalCommission}
                    {...getFieldProps('totalCommission')}
                    error={Boolean(touched.totalCommission && errors.totalCommission)}
                    helperText={touched.totalCommission && errors.totalCommission}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Status"
                      name="status"
                      id="status"
                      {...getFieldProps('status')}
                      error={Boolean(touched.status && errors.status)}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="hold">Hold</MenuItem>
                    </Select>
                    {touched.status && errors.status && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.status && errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                {status === 'paid' && (
                  <Stack gap={2} direction="row">
                    <TextField
                      required
                      id="paidAt"
                      name="paidAt"
                      label="Paid At"
                      type="date"
                      fullWidth
                      variant="outlined"
                      defaultValue={data?.paidAt}
                      {...getFieldProps('paidAt')}
                      error={Boolean(touched.paidAt && errors.paidAt)}
                      helperText={touched.paidAt && errors.paidAt}
                    />

                    <TextField
                      id="tip"
                      name="tip"
                      label="Tip to pay vendor"
                      type="number"
                      fullWidth
                      variant="outlined"
                      // defaultValue={data?.tip}
                      {...getFieldProps('tip')}
                      error={Boolean(touched.tip && errors.tip)}
                      helperText={touched.tip && errors.tip}
                    />
                  </Stack>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Save
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </React.Fragment>
  );
}
