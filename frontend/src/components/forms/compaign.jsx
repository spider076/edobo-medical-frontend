'use client';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';

// mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Select,
  ListItemText,
  FormControl,
  FormHelperText,
  Grid,
  Skeleton,
  RadioGroup,
  Radio,
  Dialog,
  FormControlLabel,
  Button,
  IconButton
} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// components
import UploadSingleFile from 'src/components/upload/UploadSingleFile';
import Search from 'src/components/dialog/search/search';

import BlurImageAvatar from 'src/components/avatar';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// yup
import * as Yup from 'yup';
// axios
import axios from 'axios';
// toast
import toast from 'react-hot-toast';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// api
import * as api from 'src/services';
// icons
import { IoMdClose } from 'react-icons/io';
import { format, parseISO } from 'date-fns';

CompaignForm.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  lineHeight: 2.5
}));

const STATUS_OPTIONS = ['enable', 'disable'];

export default function CompaignForm({ data: currentCompaign, isLoading: compaignLoading }) {
  const router = useRouter();
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [state, setstate] = useState({
    loading: false,
    name: '',
    search: '',
    open: false
  });

  const { mutate, isLoading } = useMutation(
    currentCompaign ? 'update' : 'new',
    currentCompaign ? api.updateCompaignByAdmin : api.addCompaignByAdmin,
    {
      ...(currentCompaign && {
        enabled: Boolean(currentCompaign)
      }),
      retry: false,
      onSuccess: (data) => {
        toast.success(data.message);

        router.push('/admin/compaigns');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      }
    }
  );
  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  const NewcompaignSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    cover: Yup.mixed().required('Cover is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string().required('Description is required'),
    metaTitle: Yup.string().required('Meta title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    products: Yup.array().required('Products are required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    discount: Yup.number().required('Discount is required')
  });

  const formik = useFormik({
    initialValues: {
      name: currentCompaign?.name || '',
      metaTitle: currentCompaign?.metaTitle || '',
      cover: currentCompaign?.cover || null,
      description: currentCompaign?.description || '',
      metaDescription: currentCompaign?.metaDescription || '',
      products: currentCompaign?.products || [],

      startDate: currentCompaign?.startDate ? format(parseISO(currentCompaign?.startDate), 'yyyy-MM-dd') : '',

      endDate: currentCompaign?.endDate ? format(parseISO(currentCompaign?.endDate), 'yyyy-MM-dd') : '',
      discount: currentCompaign?.discount || '',
      discountType: currentCompaign?.discountType || 'percent',
      file: currentCompaign?.cover || '',
      slug: currentCompaign?.slug || '',
      status: currentCompaign?.status || STATUS_OPTIONS[0]
    },
    enableReinitialize: true,
    validationSchema: NewcompaignSchema,
    onSubmit: async (values) => {
      const { products, ...rest } = values;
      try {
        mutate({
          ...rest,
          products: products.map((v) => v._id),
          ...(currentCompaign && {
            currentSlug: currentCompaign.slug
          })
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleDrop = async (acceptedFiles) => {
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
        if (values.file) {
          deleteMutate(values.cover._id);
        }
        setstate({ ...state, loading: false });
      });
  };
  const handleChange = (event) => {
    setFieldValue('discountType', event.target.value);
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
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    {compaignLoading ? (
                      <Skeleton variant="text" width={140} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="compaign-name">
                        {' '}
                        {'Compaign Name'}{' '}
                      </LabelStyle>
                    )}
                    {compaignLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="compaign-name"
                        fullWidth
                        {...getFieldProps('name')}
                        onChange={handleTitleChange} // add onChange handler for title
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    )}
                  </div>
                  <div>
                    {compaignLoading ? (
                      <Skeleton variant="text" width={100} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="meta-title">
                        {'Meta Title'}
                      </LabelStyle>
                    )}
                    {compaignLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="meta-title"
                        fullWidth
                        {...getFieldProps('metaTitle')}
                        error={Boolean(touched.metaTitle && errors.metaTitle)}
                        helperText={touched.metaTitle && errors.metaTitle}
                      />
                    )}
                  </div>
                  <div>
                    {compaignLoading ? (
                      <Skeleton variant="text" width={70} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="slug">
                        {' '}
                        {'Slug'}
                      </LabelStyle>
                    )}
                    {compaignLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        fullWidth
                        id="slug"
                        {...getFieldProps('slug')}
                        error={Boolean(touched.slug && errors.slug)}
                        helperText={touched.slug && errors.slug}
                      />
                    )}
                  </div>
                  <div>
                    {compaignLoading ? (
                      <Skeleton variant="text" width={100} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="description">
                        {' '}
                        {'Description'}{' '}
                      </LabelStyle>
                    )}
                    {compaignLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={240} />
                    ) : (
                      <TextField
                        fullWidth
                        id="description"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                        rows={9}
                        multiline
                      />
                    )}
                  </div>

                  <div>
                    <Stack direction="row" justifyContent="space-between">
                      {compaignLoading ? (
                        <Skeleton variant="text" width={150} />
                      ) : (
                        <LabelStyle variant="body1" component={'label'} color="text.primary">
                          Image
                        </LabelStyle>
                      )}
                      {compaignLoading ? (
                        <Skeleton variant="text" width={150} />
                      ) : (
                        <LabelStyle component={'label'} htmlFor="file">
                          <span>512 * 512</span>
                        </LabelStyle>
                      )}
                    </Stack>
                    {compaignLoading ? (
                      <Skeleton variant="rectangular" width="100%" height={225} />
                    ) : (
                      <UploadSingleFile
                        id="file"
                        file={values.cover}
                        onDrop={handleDrop}
                        error={Boolean(touched.cover && errors.cover)}
                        compaign
                        accept="image/*"
                        loading={state.loading}
                      />
                    )}
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2, mx: 0 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
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
                        {compaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="meta-description">
                            {' '}
                            {'Meta Description'}{' '}
                          </LabelStyle>
                        )}
                        {compaignLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={240} />
                        ) : (
                          <TextField
                            id="meta-description"
                            fullWidth
                            {...getFieldProps('metaDescription')}
                            error={Boolean(touched.metaDescription && errors.metaDescription)}
                            helperText={touched.metaDescription && errors.metaDescription}
                            rows={9}
                            multiline
                          />
                        )}
                      </div>
                      <FormControl>
                        <LabelStyle component={'label'} htmlFor="compaign-type">
                          Compaign type
                        </LabelStyle>
                        <RadioGroup row id="compaign-type" value={values.discountType} onChange={handleChange}>
                          <FormControlLabel value="percent" control={<Radio />} label="Percent" />
                          <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                        </RadioGroup>
                      </FormControl>
                      <div>
                        {compaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="discount">
                            {' '}
                            Discount
                          </LabelStyle>
                        )}
                        {compaignLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="discount"
                            fullWidth
                            {...getFieldProps('discount')}
                            error={Boolean(touched.discount && errors.discount)}
                            helperText={touched.discount && errors.discount}
                            type="number"
                          />
                        )}
                      </div>
                      <div>
                        {compaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="startDate">
                            {' '}
                            Start Date
                          </LabelStyle>
                        )}
                        {compaignLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="startDate"
                            fullWidth
                            {...getFieldProps('startDate')}
                            error={Boolean(touched.startDate && errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                            type="date"
                          />
                        )}
                      </div>
                      <div>
                        {compaignLoading ? (
                          <Skeleton variant="text" width={150} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="endDate">
                            {' '}
                            End Date
                          </LabelStyle>
                        )}
                        {compaignLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={56} />
                        ) : (
                          <TextField
                            id="endDate"
                            fullWidth
                            {...getFieldProps('endDate')}
                            error={Boolean(touched.endDate && errors.endDate)}
                            helperText={touched.endDate && errors.endDate}
                            type="date"
                          />
                        )}
                      </div>

                      <FormControl fullWidth sx={{ select: { textTransform: 'capitalize' } }}>
                        {compaignLoading ? (
                          <Skeleton variant="text" width={70} />
                        ) : (
                          <LabelStyle component={'label'} htmlFor="status">
                            {'Status'}
                          </LabelStyle>
                        )}
                        {compaignLoading ? (
                          <Skeleton variant="rectangular" width="100%" height={56} />
                        ) : (
                          <Select
                            id="status"
                            native
                            {...getFieldProps('status')}
                            error={Boolean(touched.status && errors.status)}
                          >
                            <option value="" style={{ display: 'none' }} />
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </Select>
                        )}
                        {touched.status && errors.status && (
                          <FormHelperText error sx={{ px: 2, mx: 0 }}>
                            {touched.status && errors.status}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <Button onClick={handleClickOpen} variant="contained" color="error" size="large">
                        Add products
                      </Button>
                      <MenuList
                        sx={{
                          pt: 0,
                          mt: 1,
                          overflow: 'auto',
                          maxHeight: 500
                        }}
                      >
                        {values.products.map((product) => (
                          <MenuItem
                            key={product?.id}
                            // className={
                            //   Boolean(state.selected.filter((v) => v._id === product?._id)?.length) ? 'active' : ''
                            // }
                            // onClick={() => handleListItemClick(multiSelect ? product : product?.slug)}
                            sx={{ px: 1 }}
                          >
                            <ListItemIcon>
                              {compaignLoading ? (
                                <Skeleton variant="circular" width={40} height={40} />
                              ) : (
                                <BlurImageAvatar
                                  alt={product.name}
                                  src={product.image.url}
                                  placeholder={'blur'}
                                  blurDataURL={product.image.blurDataURL}
                                  priority
                                  layout="fill"
                                  objectFit="cover"
                                />
                              )}
                            </ListItemIcon>
                            <ListItemText>
                              <Stack direction="row" gap={1} alignItems={'center'} justifyContent={'space-between'}>
                                <div>
                                  <Typography variant="subtitle2" color="text.primary" noWrap>
                                    {compaignLoading ? <Skeleton variant="text" width="200px" /> : product.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" noWrap>
                                    {compaignLoading ? (
                                      <Skeleton variant="text" width="100px" />
                                    ) : (
                                      fCurrency(cCurrency(product.priceSale))
                                    )}
                                  </Typography>
                                </div>
                                <IconButton
                                  size="small"
                                  aria-label="remove"
                                  onClick={() =>
                                    setFieldValue(
                                      'products',
                                      values.products.filter((v) => v._id !== product._id)
                                    )
                                  }
                                >
                                  <IoMdClose />
                                </IconButton>
                              </Stack>
                            </ListItemText>
                          </MenuItem>
                        ))}
                      </MenuList>
                      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: 600 } }}>
                        <Search
                          multiSelect
                          onClose={handleClose}
                          handleSave={(val) => {
                            setFieldValue('products', val);
                            handleClose();
                          }}
                          selectedProducts={values.products}
                        />
                      </Dialog>
                    </Stack>
                  </Card>
                  {compaignLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isLoading}
                      sx={{ ml: 'auto', mt: 3 }}
                    >
                      {currentCompaign ? 'Edit compaign' : 'Create compaign'}
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
