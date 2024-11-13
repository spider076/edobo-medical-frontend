'use client';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updateUserRole } from 'src/redux/slices/user';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
// mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Stack, TextField, Typography, Box, FormHelperText, Grid } from '@mui/material';
// components
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import countries from 'src/components/_main/checkout/countries.json';
// yup
import * as Yup from 'yup';
// axios
import axios from 'axios';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';

CreateShopSettingFrom.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5
}));

export default function CreateShopSettingFrom() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    logoLoading: false,
    loading: false,
    name: '',
    search: '',
    open: false
  });

  const { mutate, isLoading } = useMutation('new-user-shop', api.addShopByUser, {
    retry: false,
    onSuccess: () => {
      toast.success('Shop is under review!');
      dispatch(updateUserRole());
      router.push('/vendor/dashboard');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const ShopSettingScema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    cover: Yup.mixed().required('Cover is required'),
    logo: Yup.mixed().required('logo is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string().required('Description is required'),
    metaTitle: Yup.string().required('Meta title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    phone: Yup.string().required('Phone Number is required'),
    paymentInfo: Yup.object().shape({
      holderName: Yup.string().required('Holder Name is required'),
      holderEmail: Yup.string().required('Holder email is required'),
      bankName: Yup.string().required('Bank name is required'),
      AccountNo: Yup.number().required('Account No is required')
    }),
    address: Yup.object().shape({
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      streetAddress: Yup.string().required('Street Address is required')
    })
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      metaTitle: '',
      cover: null,
      logo: null,
      description: '',
      metaDescription: '',
      file: '',
      slug: '',
      phone: '',
      paymentInfo: {
        holderName: '',
        holderEmail: '',
        bankName: '',
        AccountNo: ''
      },
      address: {
        country: '',
        city: '',
        state: '',
        streetAddress: ''
      }
    },
    enableReinitialize: true,
    validationSchema: ShopSettingScema,
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      console.log(file, '');
      try {
        mutate({
          ...rest
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;
  // handle drop logo
  const handleDropLogo = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, logoLoading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('logo', {
          _id: data.public_id,
          url: data.secure_url
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        // if (values.file) {
        //   deleteMutate(values.logo._id);
        // }
        setstate({ ...state, loading: false });
      });
  };
  // handle drop cover
  const handleDropCover = async (acceptedFiles) => {
    setstate({ ...state, loading: 2 });
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    }
    setFieldValue('file', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        setstate({ ...state, loading: percentage });
      }
    };
    await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
      .then(({ data }) => {
        setFieldValue('cover', {
          _id: data.public_id,
          url: data.secure_url
        });
        setstate({ ...state, loading: false });
      })
      .then(() => {
        // if (values.file) {
        //   deleteMutate(values.cover._id);
        // }
        setstate({ ...state, loading: false });
      });
  };
  const handleTitleChange = (event) => {
    const title = event.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .replace(/\s+/g, '-'); // convert to lowercase, remove special characters, and replace spaces with hyphens
    formik.setFieldValue('slug', slug); // set the value of slug in the formik state
    formik.handleChange(event); // handle the change in formik
  };

  return (
    <Box position="relative">
      <Typography variant="h2" color="text-primary" textAlign="center" py={6}>
        Create Shop
      </Typography>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={3} flexGrow="wrap">
                  <Box sx={{ width: '100%' }}>
                    <Stack direction="row" justifyContent="space-between">
                      <LabelStyle variant="body1" component={'label'} color="text.primary">
                        Logo
                      </LabelStyle>

                      <LabelStyle component={'label'} htmlFor="file">
                        <span>512 * 512</span>
                      </LabelStyle>
                    </Stack>

                    <UploadSingleFile
                      id="file"
                      file={values.logo}
                      onDrop={handleDropLogo}
                      error={Boolean(touched.logo && errors.logo)}
                      category
                      accept="image/*"
                      loading={state.logoLoading}
                    />

                    {touched.logo && errors.logo && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.logo && errors.logo}
                      </FormHelperText>
                    )}
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <div>
                      <LabelStyle component={'label'} htmlFor="title">
                        Title
                      </LabelStyle>

                      <TextField
                        id="title"
                        fullWidth
                        {...getFieldProps('title')}
                        onChange={handleTitleChange} // add onChange handler for title
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                        sx={{ mt: 1 }}
                      />
                    </div>
                    <div>
                      <LabelStyle component={'label'} htmlFor="slug">
                        {' '}
                        {'Slug'}
                      </LabelStyle>

                      <TextField
                        fullWidth
                        id="slug"
                        {...getFieldProps('slug')}
                        error={Boolean(touched.slug && errors.slug)}
                        helperText={touched.slug && errors.slug}
                      />
                    </div>
                    <div>
                      <LabelStyle component={'label'} htmlFor="meta-title">
                        {'Meta Title'}
                      </LabelStyle>

                      <TextField
                        id="meta-title"
                        fullWidth
                        {...getFieldProps('metaTitle')}
                        error={Boolean(touched.metaTitle && errors.metaTitle)}
                        helperText={touched.metaTitle && errors.metaTitle}
                      />
                    </div>
                  </Box>
                </Stack>
                <Stack mt={3} spacing={3} direction="row" flexGrow="wrap">
                  <Box sx={{ width: '100%' }}>
                    <LabelStyle component={'label'} htmlFor="description">
                      {' '}
                      {'Description'}{' '}
                    </LabelStyle>

                    <TextField
                      fullWidth
                      id="description"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      rows={9}
                      multiline
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <LabelStyle component={'label'} htmlFor="meta-description">
                      {' '}
                      {'Meta Description'}{' '}
                    </LabelStyle>

                    <TextField
                      id="meta-description"
                      fullWidth
                      {...getFieldProps('metaDescription')}
                      error={Boolean(touched.metaDescription && errors.metaDescription)}
                      helperText={touched.metaDescription && errors.metaDescription}
                      rows={9}
                      multiline
                    />
                  </Box>
                </Stack>
                <Box mt={3}>
                  <Stack direction="row" justifyContent="space-between">
                    <LabelStyle variant="body1" component={'label'} color="text.primary">
                      Cover
                    </LabelStyle>

                    <LabelStyle component={'label'} htmlFor="file">
                      <span>990 * 300</span>
                    </LabelStyle>
                  </Stack>

                  <UploadSingleFile
                    id="file"
                    file={values.cover}
                    onDrop={handleDropCover}
                    error={Boolean(touched.cover && errors.cover)}
                    category
                    accept="image/*"
                    loading={state.loading}
                  />

                  {touched.cover && errors.cover && (
                    <FormHelperText error sx={{ px: 2, mx: 0 }}>
                      {touched.cover && errors.cover}
                    </FormHelperText>
                  )}
                </Box>{' '}
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
                    <Stack spacing={2}>
                      <div>
                        <LabelStyle component={'label'} htmlFor="holder-name">
                          Holder Name
                        </LabelStyle>

                        <TextField
                          id="holder-name"
                          fullWidth
                          {...getFieldProps('paymentInfo.holderName')}
                          error={Boolean(touched.paymentInfo?.holderName && errors.paymentInfo?.holderName)}
                          helperText={touched.paymentInfo?.holderName && errors.paymentInfo?.holderName}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="holder-email">
                          Holder Email
                        </LabelStyle>

                        <TextField
                          id="holder-email"
                          fullWidth
                          {...getFieldProps('paymentInfo.holderEmail')}
                          error={Boolean(touched.paymentInfo?.holderEmail && errors.paymentInfo?.holderEmail)}
                          helperText={touched.paymentInfo?.holderEmail && errors.paymentInfo?.holderEmail}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="bank-name">
                          Bank Name
                        </LabelStyle>

                        <TextField
                          id="bank-name"
                          fullWidth
                          {...getFieldProps('paymentInfo.bankName')}
                          error={Boolean(touched.paymentInfo?.bankName && errors.paymentInfo?.bankName)}
                          helperText={touched.paymentInfo?.bankName && errors.paymentInfo?.bankName}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="account-number">
                          Account Number
                        </LabelStyle>

                        <TextField
                          id="account-number"
                          fullWidth
                          {...getFieldProps('paymentInfo.AccountNo')}
                          error={Boolean(touched.paymentInfo?.AccountNo && errors.paymentInfo?.AccountNo)}
                          helperText={touched.paymentInfo?.AccountNo && errors.paymentInfo?.AccountNo}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="phone">
                          Phone Number
                        </LabelStyle>

                        <TextField
                          id="phone"
                          fullWidth
                          {...getFieldProps('phone')}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="country">
                          Country
                        </LabelStyle>

                        <TextField
                          id="country"
                          select
                          fullWidth
                          placeholder="Country"
                          {...getFieldProps('address.country')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched?.address?.country && errors?.address?.country)}
                          helperText={touched?.address?.country && errors?.address?.country}
                        >
                          {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="city">
                          City
                        </LabelStyle>

                        <TextField
                          id="city"
                          fullWidth
                          {...getFieldProps('address.city')}
                          error={Boolean(touched.address?.city && errors.address?.city)}
                          helperText={touched.address?.city && errors.address?.city}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="state">
                          State
                        </LabelStyle>

                        <TextField
                          id="state"
                          fullWidth
                          {...getFieldProps('address.state')}
                          error={Boolean(touched.address?.state && errors.address?.state)}
                          helperText={touched.address?.state && errors.address?.state}
                        />
                      </div>
                      <div>
                        <LabelStyle component={'label'} htmlFor="streetAddress">
                          Street Address
                        </LabelStyle>

                        <TextField
                          id="streetAddress"
                          fullWidth
                          {...getFieldProps('address.streetAddress')}
                          error={Boolean(touched.address?.streetAddress && errors.address?.streetAddress)}
                          helperText={touched.address?.streetAddress && errors.address?.streetAddress}
                        />
                      </div>
                    </Stack>
                  </Card>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isLoading}
                    sx={{ ml: 'auto', mt: 3 }}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
