'use client';
// react
import { useMutation, useQuery } from 'react-query';
import React from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
// icons
import { MdVerified } from 'react-icons/md';
// mui
import { Box, Grid, Card, Stack, TextField, Typography, FormHelperText, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import UploadAvatar from 'src/components/upload/UploadAvatar';
import countries from 'src/components/_main/checkout/countries.json';
// api
import * as api from 'src/services';
// yup
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// axios
import axios from 'axios';
// redux
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';
import { useSelector } from 'react-redux';

export default function AccountGeneral() {
  const { user: adminUser } = useSelector(({ user }) => user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading: profileLoading } = useQuery(['user-profile'], () => api.getProfile(), {
    onSuccess: ({ data }) => {
      setAvatarId(data?.cover?._id || null);
    }
  });
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const { mutate, isLoading: updateLoading } = useMutation(api.updateProfile, {
    onSuccess: (res) => {
      dispatch(setLogin(res.data));
      toast.success('Updated profile');
    }
  });
  const { mutate: avatarMutate, isLoading: avatarLoading } = useMutation(api.singleDeleteFile, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  const isLoading = profileLoading;
  const user = data?.data || {};
  const [loading, setLoading] = React.useState(100);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [avatarId, setAvatarId] = React.useState(null);
  const callbackLoading = useCallback(
    (value) => {
      setLoading(value);
    },
    [setLoading]
  );
  console.log(user, 'user data');

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    phoneNumber: Yup.string().required('Phone required'),
    gender: Yup.string().required('Gender required')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      photoURL: user?.cover?.url || '',
      phoneNumber: user?.phone || '',
      gender: user?.gender || '',
      about: user?.about || '',
      file: '',
      cover: user?.cover,
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      country: user?.country || 'Andorra',
      zip: user?.zip || ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: values.firstName + ' ' + values.lastName,
        phone: values.phoneNumber,
        about: values.about,
        gender: values.gender,
        cover: values.cover,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        zip: values.zip
        // photoURL: values.photoURL,
      };
      mutate(data);
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoadingUpload(true);
      setFieldValue('file', file);
      setFieldValue('photoURL', {
        ...file,
        preview: URL.createObjectURL(file)
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          callbackLoading(percentage);
        }
      };
      await axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData, config)
        .then(({ data }) => {
          setFieldValue('cover', {
            _id: data.public_id,
            url: data.secure_url
          });
        })
        .then(() => {
          avatarId && avatarMutate(avatarId);
          setLoadingUpload(false);
        });
    }
  };

  React.useEffect(() => {
    if (!pathname.includes('dashboard') && adminUser?.role.includes('admin')) {
      router.push('/admin/settings');
      // toast("Admin can't access this page.", {
      //   duration: 6000
      // });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: ResendOTPMutate } = useMutation(api.resendOTP, {
    retry: false,
    onSuccess: async () => {
      toast.success('OTP resent');
      setVerifyLoading(false);
      router.push(`/auth/verify-otp`);
    },
    onError: () => {
      toast.error('Invalid OTP.');
      setVerifyLoading(false);
    }
  });

  const onVerifyAccount = () => {
    setVerifyLoading(true);
    ResendOTPMutate({ email: user.email });
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 11.8, px: 3, textAlign: 'center' }}>
              {isLoading || avatarLoading || loadingUpload ? (
                <Stack alignItems="center">
                  <Skeleton variant="circular" width={142} height={142} />
                  <Skeleton variant="text" width={150} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width={150} />
                </Stack>
              ) : (
                <UploadAvatar
                  accept="image/*"
                  file={values.photoURL}
                  loading={loading}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.photoURL && errors.photoURL)}
                  caption={
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                          mb: 1,
                          position: 'relative',
                          svg: {
                            color: 'primary.main',
                            position: 'absolute',
                            top: '-123px',
                            right: '33%',
                            transform: 'translate(24%, -100%)'
                          }
                        }}
                      >
                        {user?.isVerified && <MdVerified size={24} />}
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {3145728}
                      </Typography>
                    </>
                  }
                />
              )}

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
              {isLoading || user?.isVerified ? (
                ''
              ) : (
                <LoadingButton loading={verifyLoading} variant="text" color="primary" onClick={onVerifyAccount}>
                  Verify Account
                </LoadingButton>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: 3,
                '& .MuiTypography-root': {
                  marginBottom: '8px !important'
                }
              }}
            >
              <Stack spacing={{ xs: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="first-name" component={'label'}>
                      First Name
                    </Typography>
                    <TextField
                      id="first-name"
                      fullWidth
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="last-name" component={'label'}>
                      Last name
                    </Typography>
                    <TextField
                      id="last-name"
                      fullWidth
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="phone" component={'label'}>
                      Phone
                    </Typography>
                    <TextField
                      fullWidth
                      id="phone"
                      {...getFieldProps('phoneNumber')}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="gender" component={'label'}>
                      Gender
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      id="iender"
                      placeholder="Gender"
                      {...getFieldProps('gender')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </TextField>
                  </Stack>
                </Stack>

                <Stack spacing={2}>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="address" component={'label'}>
                      Address
                    </Typography>
                    <TextField
                      id="address"
                      fullWidth
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Stack>
                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="country" component={'label'}>
                      Country
                    </Typography>
                    <TextField
                      id="country"
                      select
                      fullWidth
                      placeholder="Country"
                      {...getFieldProps('country')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                    >
                      {countries.map((option) => (
                        <option key={option.code} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="city" component={'label'}>
                        Town City
                      </Typography>
                      <TextField
                        id="city"
                        fullWidth
                        {...getFieldProps('city')}
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Stack>
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="state" component={'label'}>
                        State
                      </Typography>
                      <TextField
                        id="state"
                        fullWidth
                        {...getFieldProps('state')}
                        error={Boolean(touched.state && errors.state)}
                        helperText={touched.state && errors.state}
                      />
                    </Stack>
                    <Stack spacing={0.5} width={1}>
                      <Typography variant="overline" color="text.primary" htmlFor="zip" component={'label'}>
                        Zip/Postal Code
                      </Typography>
                      <TextField
                        id="zip"
                        fullWidth
                        {...getFieldProps('zip')}
                        error={Boolean(touched.zip && errors.zip)}
                        helperText={touched.zip && errors.zip}
                        type="number"
                      />
                    </Stack>
                  </Stack>

                  <Stack spacing={0.5} width={1}>
                    <Typography variant="overline" color="text.primary" htmlFor="about" component={'label'}>
                      About
                    </Typography>
                    <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} id="about" />
                  </Stack>
                </Stack>
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={updateLoading || avatarLoading || loadingUpload}
                >
                  Save
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
