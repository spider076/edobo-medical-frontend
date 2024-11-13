'use client';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from 'react-query';
import RouterLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import toast from 'react-hot-toast';

// formik
import { useFormik, Form, FormikProvider } from 'formik';
// cookies
import { createCookies } from 'src/hooks/cookies';
// redux
import { useDispatch } from 'react-redux';
import { setWishlist } from 'src/redux/slices/wishlist';
import { setLogin } from 'src/redux/slices/user';
// api
import * as api from 'src/services';
// mui
import {
  Link,
  Typography,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { MdOutlineVisibility, MdLock, MdOutlineVisibilityOff } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';

export default function LoginForm() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useMutation(api.login, {
    onSuccess: async (data) => {
      dispatch(setLogin(data.user));
      dispatch(setWishlist(data.user.wishlist));
      await createCookies('token', data.token);
      setloading(false);
      toast.success('Logged in successfully!');
      const isAdmin = data.user.role.includes('admin');
      const isVendor = data.user.role.includes('vendor');
      push(redirect || isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/');
    },
    onError: (err) => {
      setloading(false);
      toast.error(err.response.data.message);
    }
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email').required('Email is required.'),
    password: Yup.string().required('Password is required.').min(8, 'Password should be 8 characters or longer.')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const { email, password } = values;
      setloading(true);
      mutate({ email, password });
    }
  });
  const { errors, touched, setFieldValue, values, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Stack
        mb={3}
        gap={2}
        sx={{
          '& .MuiAlert-action': {
            alignItems: 'center'
          }
        }}
      >
        <Alert
          severity="primary"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue('email', 'admin@nextall.com');
                setFieldValue('password', 'test1234');
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Admin</AlertTitle>
          <b>Email:</b> admin@test.com | <b>password:</b> test1234
        </Alert>
        <Alert
          severity="secondary"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue('email', 'vendor@nextall.com');
                setFieldValue('password', 'test1234');
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Vendor</AlertTitle>
          <b>Email:</b> vendor@test.com | <b>password:</b> test1234
        </Alert>
      </Stack>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
                Email
              </Typography>
              <TextField
                id="email"
                fullWidth
                autoComplete="username"
                type="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdMail size={24} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>

            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="password" component={'label'}>
                Password
              </Typography>
              <TextField
                id="password"
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLock size={24} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
            <Link component={RouterLink} variant="subtitle2" href="/auth/forget-password">
              Forgot password
            </Link>
          </Stack>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            login
          </LoadingButton>
          <Typography variant="subtitle2" mt={3} textAlign="center">
            Don{`'`}t you have an account? &nbsp;
            <Link href={`/auth/register${redirect ? '?redirect=' + redirect : ''}`} component={RouterLink}>
              Register
            </Link>
          </Typography>
        </Form>
      </FormikProvider>
    </>
  );
}
