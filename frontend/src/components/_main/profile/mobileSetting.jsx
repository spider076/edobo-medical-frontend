'use client';
import React from 'react';
import { useRouter } from 'next-nprogress-bar';
// mui
import {
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Switch,
  Container,
  useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// react-icons
import { MdLogout } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { IoMdSettings } from 'react-icons/io';
import { IoMoonOutline } from 'react-icons/io5';
import { MdKey } from 'react-icons/md';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdLogin } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
// redux
import { setThemeMode } from 'src/redux/slices/settings';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from 'src/redux/slices/user';
import { resetWishlist } from 'src/redux/slices/wishlist';
import { deleteCookies } from 'src/hooks/cookies';

export default function MobileSetting() {
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const { themeMode } = useSelector(({ settings }) => settings);
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const toggleThemeMode = (event) => {
    event.stopPropagation();
    dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
  };
  const isDeskTop = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(() => {
    if (isDeskTop) {
      router.push('/profile/wishlist');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeskTop]);
  return (
    <Container maxWidth="xl">
      <List sx={{ mt: 5 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoMoonOutline size={20} />
            </ListItemIcon>
            <ListItemText primary="Theme Mode" />
            <Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/');
            }}
            sx={{ py: 2 }}
          >
            <ListItemIcon>
              <AiOutlineHome size={20} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated && (
          <>
            <Divider />
            {user?.role === 'admin' || user?.role === 'super admin' ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push('/dashboard');
                    }}
                    sx={{ py: 2 }}
                  >
                    <ListItemIcon>
                      <LuLayoutDashboard size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ) : null}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/profile/wishlist');
                }}
                sx={{ py: 2 }}
              >
                <ListItemIcon>
                  <IoIosHeartEmpty size={20} />
                </ListItemIcon>
                <ListItemText primary="Wishlist" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push('/profile/invoice');
                }}
                sx={{ py: 2 }}
              >
                <ListItemIcon>
                  <LiaFileInvoiceSolid size={20} />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(
                    user.role === 'admin' || user.role === 'super admin' ? '/admin/settings' : '/profile/general'
                  );
                }}
                sx={{ py: 2 }}
              >
                <ListItemIcon>
                  <IoMdSettings size={20} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(
                    user.role === 'admin' || user.role === 'super admin'
                      ? '/admin/settings/change-password'
                      : '/profile/change-password'
                  );
                }}
                sx={{ py: 2 }}
              >
                <ListItemIcon>
                  <MdKey size={20} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Stack spacing={2} mt={1}>
        {isAuthenticated ? (
          <Button
            onClick={() => {
              deleteCookies('token');
              dispatch(setLogout());
              dispatch(resetWishlist());
              router.push('/');
            }}
            variant="outlined"
            color="inherit"
            startIcon={<MdLogout />}
            fullWidth
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                router.push('/auth/login');
              }}
              variant="outlined"
              color="inherit"
              startIcon={<MdLogin />}
              fullWidth
            >
              Login
            </Button>
            <Button
              onClick={() => {
                router.push('/auth/register');
              }}
              variant="outlined"
              color="inherit"
              startIcon={<FaRegUserCircle />}
              fullWidth
            >
              Register
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
}
