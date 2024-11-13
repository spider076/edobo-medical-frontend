'use client';
import * as Yup from 'yup';
import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { capitalCase } from 'change-case';
import { useRouter } from 'next-nprogress-bar';

import { Form, FormikProvider, useFormik } from 'formik';
// mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Select,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Switch,
  InputAdornment
} from '@mui/material';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
import axios from 'axios';

// components
import UploadMultiFile from 'src/components/upload/UploadMultiFile';
import { fCurrency } from 'src/utils/formatNumber';
// ----------------------------------------------------------------------

const GENDER_OPTION = ['men', 'women', 'kids', 'others'];
const STATUS_OPTIONS = ['sale', 'new', 'regular', 'disabled'];
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,

  lineHeight: 2.5
}));

// ----------------------------------------------------------------------

export default function ProductForm({
  categories,
  currentProduct,
  categoryLoading = false,
  isInitialized = false,
  brands,
  shops,
  isVendor
}) {
  const router = useRouter();
  const [loading, setloading] = React.useState(false);
  const { mutate, isLoading: updateLoading } = useMutation(
    currentProduct ? 'update' : 'new',
    currentProduct
      ? isVendor
        ? api.updateVendorProduct
        : api.updateProductByAdmin
      : isVendor
        ? api.createVendorProduct
        : api.createProductByAdmin,
    {
      onSuccess: (data) => {
        toast.success(data.message);

        router.push((isVendor ? '/vendor' : '/admin') + '/products');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      }
    }
  );
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    code: Yup.string().required('Product code is required'),
    tags: Yup.array().min(1, 'Tags is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    shop: isVendor ? Yup.string().nullable().notRequired() : Yup.string().required('Shop is required'),
    subCategory: Yup.string().required('Sub Category is required'),
    slug: Yup.string().required('Slug is required'),
    brand: Yup.string().required('brand is required'),
    metaTitle: Yup.string().required('Meta title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    images: Yup.array().min(1, 'Images is required'),
    sku: Yup.string().required('Sku is required'),
    available: Yup.number().required('Quantaty is required'),
    colors: Yup.array().required('Color is required'),
    sizes: Yup.array().required('Size is required'),
    price: Yup.number().required('Price is required'),
    priceSale: Yup.number()
      .required('Sale price is required')
      .lessThan(Yup.ref('price'), 'Sale price should be smaller than price')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      code: currentProduct?.code || '',
      slug: currentProduct?.slug || '',
      metaTitle: currentProduct?.metaTitle || '',
      metaDescription: currentProduct?.metaDescription || '',
      brand: currentProduct?.brand || brands[0]?._id || '',
      tags: currentProduct?.tags || [],
      gender: currentProduct?.gender || '',
      category: currentProduct?.category || (categories.length && categories[0]?._id) || '',
      shop: isVendor ? null : currentProduct?.shop || (shops?.length && shops[0]?._id) || '',
      subCategory: currentProduct?.subCategory || (categories.length && categories[0].subCategories[0]?._id) || '',
      status: currentProduct?.status || STATUS_OPTIONS[0],
      blob: currentProduct?.blob || [],
      isFeatured: currentProduct?.isFeatured || false,
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || '',
      priceSale: currentProduct?.priceSale || '',
      colors: currentProduct?.colors || '',
      sizes: currentProduct?.sizes || '',
      available: currentProduct?.available || '',
      images: currentProduct?.images || []
    },

    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { ...rest } = values;
      try {
        mutate({
          ...rest,
          priceSale: values.priceSale || values.price,
          ...(currentProduct && { currentSlug: currentProduct.slug })
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;
  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  // handle drop
  const handleDrop = (acceptedFiles) => {
    setloading(true);
    const uploaders = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
      setFieldValue('blob', values.blob.concat(acceptedFiles));
      return axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
    });

    axios.all(uploaders).then((data) => {
      const newImages = data.map(({ data }) => ({
        url: data.secure_url,
        _id: data.public_id
        // blob: blobs[i],
      }));
      setloading(false);
      setFieldValue('images', values.images.concat(newImages));
    });
  };
  // handleAddVariants

  // handleRemoveAll
  const handleRemoveAll = () => {
    values.images.forEach((image) => {
      deleteMutate(image._id);
    });
    setFieldValue('images', []);
  };
  // handleRemove
  const handleRemove = (file) => {
    const removeImage = values.images.filter((_file) => {
      if (_file._id === file._id) {
        deleteMutate(file._id);
      }
      return _file !== file;
    });
    setFieldValue('images', removeImage);
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
    <Stack spacing={3}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div>
                      {isInitialized ? (
                        <Skeleton variant="text" width={140} />
                      ) : (
                        <LabelStyle component={'label'} htmlFor="product-name">
                          {'Product Name'}
                        </LabelStyle>
                      )}
                      {isInitialized ? (
                        <Skeleton variant="rectangular" width="100%" height={56} />
                      ) : (
                        <TextField
                          id="product-name"
                          fullWidth
                          {...getFieldProps('name')}
                          onChange={handleTitleChange} // add onChange handler for title
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      )}
                    </div>
                    <div>
                      <Grid container spacing={2}>
                        {isVendor ? null : (
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              {isInitialized ? (
                                <Skeleton variant="text" width={100} />
                              ) : (
                                <LabelStyle component={'label'} htmlFor="shop-select">
                                  {'Shop'}
                                </LabelStyle>
                              )}

                              <Select native {...getFieldProps('shop')} value={values.shop} id="shop-select">
                                {shops?.map((shop) => (
                                  <option key={shop._id} value={shop._id}>
                                    {shop.title}
                                  </option>
                                ))}
                              </Select>

                              {touched.shop && errors.shop && (
                                <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                  {touched.shop && errors.shop}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        )}

                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="grouped-native-select">
                                {'Category'}
                              </LabelStyle>
                            )}
                            {!categoryLoading ? (
                              <Select
                                native
                                {...getFieldProps('category')}
                                value={values.category}
                                id="grouped-native-select"
                              >
                                {categories?.map((category) => (
                                  <option key={category._id} value={category._id}>
                                    {category.name}
                                  </option>

                                  // </optgroup>
                                ))}
                              </Select>
                            ) : (
                              <Skeleton variant="rectangular" width={'100%'} height={56} />
                            )}
                            {touched.category && errors.category && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.category && errors.category}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="grouped-native-select-subCategory">
                                {'Sub Category'}
                              </LabelStyle>
                            )}
                            {!categoryLoading ? (
                              <Select
                                native
                                {...getFieldProps('subCategory')}
                                value={values.subCategory}
                                id="grouped-native-select-subCategory"
                              >
                                {categories
                                  .find((v) => v._id.toString() === values.category)
                                  ?.subCategories?.map((subCategory) => (
                                    <option key={subCategory._id} value={subCategory._id}>
                                      {subCategory.name}
                                    </option>

                                    // </optgroup>
                                  ))}
                              </Select>
                            ) : (
                              <Skeleton variant="rectangular" width={'100%'} height={56} />
                            )}
                            {touched.subCategory && errors.subCategory && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.subCategory && errors.subCategory}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="brand-name">
                                {'Brand'}
                              </LabelStyle>
                            )}

                            <Select native {...getFieldProps('brand')} value={values.brand} id="grouped-native-select">
                              {brands?.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                  {brand.name}
                                </option>
                              ))}
                            </Select>

                            {touched.brand && errors.brand && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.brand && errors.brand}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <LabelStyle component={'label'} htmlFor="size">
                            {'Sizes'}
                          </LabelStyle>

                          <Autocomplete
                            id="size"
                            multiple
                            freeSolo
                            value={values.sizes}
                            onChange={(event, newValue) => {
                              setFieldValue('sizes', newValue);
                            }}
                            options={[]}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                id=""
                                {...params}
                                error={Boolean(touched.sizes && errors.sizes)}
                                helperText={touched.sizes && errors.sizes}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <LabelStyle component={'label'} htmlFor="color">
                            {'Colors'}
                          </LabelStyle>

                          <Autocomplete
                            id="color"
                            multiple
                            freeSolo
                            value={values.colors}
                            onChange={(event, newValue) => {
                              setFieldValue('colors', newValue);
                            }}
                            options={[]}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                id=""
                                {...params}
                                error={Boolean(touched.colors && errors.colors)}
                                helperText={touched.colors && errors.colors}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={80} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="gander">
                                {'Gender'}
                              </LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton variant="rectangular" width="100%" height={56} />
                            ) : (
                              <Select
                                id="gander"
                                native
                                {...getFieldProps('gender')}
                                error={Boolean(touched.gender && errors.gender)}
                              >
                                <option value={''}>
                                  <em>None</em>
                                </option>
                                {GENDER_OPTION.map((gender) => (
                                  <option key={gender} value={gender}>
                                    {capitalCase(gender)}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={80} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="status">
                                {'Status'}
                              </LabelStyle>
                            )}
                            {isInitialized ? (
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
                                    {capitalCase(status)}
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
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <div>
                            {isInitialized ? (
                              <Skeleton variant="text" width={120} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="product-code">
                                {'Product Code'}
                              </LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton variant="rectangular" width="100%" height={56} />
                            ) : (
                              <TextField
                                id="product-code"
                                fullWidth
                                {...getFieldProps('code')}
                                error={Boolean(touched.code && errors.code)}
                                helperText={touched.code && errors.code}
                              />
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <div>
                            <LabelStyle component={'label'} htmlFor="product-sku">
                              {'Product Sku'}
                            </LabelStyle>
                            <TextField
                              id="product-sku"
                              fullWidth
                              {...getFieldProps('sku')}
                              error={Boolean(touched.sku && errors.sku)}
                              helperText={touched.sku && errors.sku}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          {isInitialized ? (
                            <Skeleton variant="text" width={70} />
                          ) : (
                            <LabelStyle component={'label'} htmlFor="tags">
                              {'Tags'}
                            </LabelStyle>
                          )}
                          {isInitialized ? (
                            <Skeleton variant="rectangular" width="100%" height={56} />
                          ) : (
                            <Autocomplete
                              id="tags"
                              multiple
                              freeSolo
                              value={values.tags}
                              onChange={(event, newValue) => {
                                setFieldValue('tags', newValue);
                              }}
                              options={[]}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  id=""
                                  {...params}
                                  error={Boolean(touched.tags && errors.tags)}
                                  helperText={touched.tags && errors.tags}
                                />
                              )}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <div>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="meta-title">
                                {'Meta Title'}
                              </LabelStyle>
                            )}
                            {isInitialized ? (
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
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <div>
                            {isInitialized ? (
                              <Skeleton variant="text" width={120} />
                            ) : (
                              <LabelStyle component={'label'} htmlFor="description">
                                {'Description'}{' '}
                              </LabelStyle>
                            )}
                            {isInitialized ? (
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
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <div>
                            <LabelStyle component={'label'} htmlFor="product-image">
                              {'Products Images'} <span>1080 * 1080</span>
                            </LabelStyle>
                            <UploadMultiFile
                              id="product-image"
                              showPreview
                              maxSize={3145728}
                              accept="image/*"
                              files={values?.images}
                              loading={loading}
                              onDrop={handleDrop}
                              onRemove={handleRemove}
                              onRemoveAll={handleRemoveAll}
                              blob={values.blob}
                              error={Boolean(touched.images && errors.images)}
                            />
                            {touched.images && errors.images && (
                              <FormHelperText error sx={{ px: 2 }}>
                                {touched.images && errors.images}
                              </FormHelperText>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3} pb={1}>
                  <div>
                    {isInitialized ? (
                      <Skeleton variant="text" width={70} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="slug">
                        {'Slug'}
                      </LabelStyle>
                    )}
                    {isInitialized ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <TextField
                        id="slug"
                        fullWidth
                        {...getFieldProps('slug')}
                        error={Boolean(touched.slug && errors.slug)}
                        helperText={touched.slug && errors.slug}
                      />
                    )}
                  </div>
                  <div>
                    {isInitialized ? (
                      <Skeleton variant="text" width={140} />
                    ) : (
                      <LabelStyle component={'label'} htmlFor="meta-description">
                        {'Meta Description'}{' '}
                      </LabelStyle>
                    )}
                    {isInitialized ? (
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

                  <div>
                    <LabelStyle component={'label'} htmlFor="quantity">
                      {'Quantity'}
                    </LabelStyle>
                    <TextField
                      id="quantity"
                      fullWidth
                      type="number"
                      {...getFieldProps('available')}
                      error={Boolean(touched.available && errors.available)}
                      helperText={touched.available && errors.available}
                    />
                  </div>

                  <div>
                    <LabelStyle component={'label'} htmlFor="regular-price">
                      {'Regular Price'}
                    </LabelStyle>
                    <TextField
                      id="regular-price"
                      fullWidth
                      placeholder="0.00"
                      {...getFieldProps('price')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{fCurrency(0)?.split('0')[0]}</InputAdornment>,
                        type: 'number'
                      }}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </div>
                  <div>
                    <LabelStyle component={'label'} htmlFor="sale-price">
                      {'Sale Price'}
                    </LabelStyle>
                    <TextField
                      id="sale-price"
                      fullWidth
                      placeholder="0.00"
                      {...getFieldProps('priceSale')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{fCurrency(0)?.split('0')[0]}</InputAdornment>,
                        type: 'number'
                      }}
                      error={Boolean(touched.priceSale && errors.priceSale)}
                      helperText={touched.priceSale && errors.priceSale}
                    />
                  </div>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={(e) => setFieldValue('isFeatured', e.target.checked)}
                            checked={values.isFeatured}
                          />
                        }
                        label={'Featured Product'}
                      />
                    </FormGroup>
                  </div>
                  <Stack spacing={2}>
                    {isInitialized ? (
                      <Skeleton variant="rectangular" width="100%" height={56} />
                    ) : (
                      <LoadingButton type="submit" variant="contained" size="large" fullWidth loading={updateLoading}>
                        {currentProduct ? 'Update Product' : 'Create Product'}
                      </LoadingButton>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
ProductForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subCategories: PropTypes.array.isRequired
      // ... add other required properties for category
    })
  ).isRequired,
  currentProduct: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string,
    slug: PropTypes.string,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    brand: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    gender: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    status: PropTypes.string,
    blob: PropTypes.array,
    isFeatured: PropTypes.bool,
    sku: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    sizes: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.number,
    images: PropTypes.array
    // ... add other optional properties for currentProduct
  }),
  categoryLoading: PropTypes.bool,
  isInitialized: PropTypes.bool,
  isVendor: PropTypes.bool,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
      // ... add other required properties for brands
    })
  )
};
