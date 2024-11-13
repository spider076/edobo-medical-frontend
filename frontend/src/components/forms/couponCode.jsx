'use client';
import React from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

// mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  FormControl,
  Grid,
  Skeleton,
  FormControlLabel,
  Radio,
  InputAdornment,
  RadioGroup
} from '@mui/material';
// api
import * as api from 'src/services';
// next
import { useRouter } from 'next-nprogress-bar';
// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5
}));

export default function CouponCodeForm({ data: currentCouponCode, isLoading: categoryLoading }) {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    currentCouponCode ? 'update' : 'new',
    currentCouponCode ? api.updateCouponCodeByAdmin : api.addCouponCodeByAdmin,
    {
      ...(currentCouponCode && {
        enabled: Boolean(currentCouponCode)
      }),
      retry: false,
      onSuccess: (data) => {
        toast.success(data.message);

        router.push('/admin/coupon-codes');
      },
      onError: (error) => {
        toast.error(error.message);
      }
    }
  );

  const CouponCodeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    code: Yup.string()
      .required('Cover is required')
      .matches(/^(\S+$)/g, 'Space is not allowed'),
    discount: Yup.number().required('Discount is required'),
    expire: Yup.date().when('eventStartDate', (eventStartDate, schema) =>
      schema.min(new Date(), "Expiry date can't be past date.")
    )
  });

  const formik = useFormik({
    initialValues: {
      name: currentCouponCode?.name || '',
      code: currentCouponCode?.code || '',
      type: currentCouponCode?.type || 'fixed',
      discount: currentCouponCode?.discount || '',
      expire: currentCouponCode?.expire?.split('T')[0] || '',
      description: currentCouponCode?.description || ''
    },
    enableReinitialize: true,
    validationSchema: CouponCodeSchema,
    onSubmit: async (values) => {
      const { ...rest } = values;
      try {
        mutate({
          ...rest,
          ...(currentCouponCode && {
            currentId: currentCouponCode?._id
          })
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;
  return (
    <Box position="relative">
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    {categoryLoading ? (
                      <Skeleton variant="text" width={140} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="name">
                        {' '}
                        {'Name'}{' '}
                      </LabelStyle>
                    )}
                    {categoryLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="name"
                        fullWidth
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    )}
                  </div>
                  <div>
                    {categoryLoading ? (
                      <Skeleton variant="text" width={100} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="coupen-code">
                        {'Coupon code'}
                      </LabelStyle>
                    )}
                    {categoryLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="coupen-code"
                        fullWidth
                        {...getFieldProps('code')}
                        error={Boolean(touched.code && errors.code)}
                        helperText={touched.code && errors.code}
                      />
                    )}
                  </div>
                  <div>
                    <FormControl>
                      <LabelStyle component={'label'} htmlFor="discount-type">
                        Discount type
                      </LabelStyle>
                      <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={values.type}
                        onChange={(e) => setFieldValue('type', e.target.value)}
                      >
                        <FormControlLabel value="fixed" control={<Radio />} label="Fixed amount" />
                        <FormControlLabel value="percent" control={<Radio />} label="Percentage" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div>
                    {categoryLoading ? (
                      <Skeleton variant="text" width={70} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="discount">
                        {' '}
                        {'Discount'}
                      </LabelStyle>
                    )}
                    {categoryLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="discount"
                        fullWidth
                        {...getFieldProps('discount')}
                        error={Boolean(touched.discount && errors.discount)}
                        helperText={touched.discount && errors.discount}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">{values.type === 'fixed' ? '$' : '%'}</InputAdornment>
                          )
                        }}
                      />
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                style={{
                  position: '-webkit-sticky',
                  position: 'sticky',
                  top: 0
                }}
              >
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <div>
                        {categoryLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="description">
                            {' '}
                            {'Description'}{' '}
                          </LabelStyle>
                        )}
                        {categoryLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={240} />
                        ) : (
                          <TextField
                            id="description"
                            fullWidth
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                            rows={9}
                            multiline
                          />
                        )}
                      </div>
                      <div>
                        {categoryLoading ? (
                          <Skeleton variant="text" width={70} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="expiry-date">
                            {' '}
                            {'Expiry date'}
                          </LabelStyle>
                        )}
                        {categoryLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="expiry-date"
                            type="date"
                            fullWidth
                            {...getFieldProps('expire')}
                            error={Boolean(touched.expire && errors.expire)}
                            helperText={touched.expire && errors.expire}
                          />
                        )}
                      </div>
                    </Stack>
                  </Card>
                  {categoryLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isLoading}
                      sx={{ ml: 'auto', mt: 3 }}
                    >
                      {currentCouponCode ? 'edit coupon code' : 'create coupon code'}
                    </LoadingButton>
                  )}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
CouponCodeForm.propTypes = {
  data: PropTypes.object, // Adjust the type accordingly based on the actual data type
  isLoading: PropTypes.bool
};
