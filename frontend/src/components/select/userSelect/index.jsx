'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
// mui
import { Avatar, IconButton, Typography, Stack, Divider, Box } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// components
import MenuPopover from 'src/components/popover/popover';
import { PATH_PAGE } from 'src/routes/paths';
import { UserList } from 'src/components/lists';
import BlurImageAvatar from 'src/components/avatar';
// redux
import { useSelector } from 'react-redux';

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function UserSelect({ isAdmin }) {
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPath = getKeyByValue(PATH_PAGE.auth, pathname);
  const isHomePath = pathname.slice(3) === '';
  const anchorRef = React.useRef(null);
  const [openUser, setOpen] = React.useState(false);

  const handleOpenUser = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      setOpen(true);
    }
  };
  const handleCloseUser = () => {
    setOpen(false);
  };
  return (
    <Box>
      {!isAuthenticated && !isAdmin ? (
        // <IconButton
        //   name="user-select"
        //   size="small"
        //   onClick={() => router.push(`/auth/login${isAuthPath || isHomePath ? '' : `?redirect=${pathname}`}`)}
        // >
        //   <Avatar size="small" />
        // </IconButton>
        <Stack direction="row" gap={1}>
          <Typography
            href={`/auth/login${isAuthPath || isHomePath ? '' : `?redirect=${pathname}`}`}
            variant="body2"
            color="text.primary"
            component={Link}
            fontSize={14}
          >
            Login
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography
            variant="body2"
            color="text.primary"
            component={Link}
            href={`/auth/register${isAuthPath || isHomePath ? '' : `?redirect=${pathname}`}`}
            fontSize={14}
          >
            Register
          </Typography>
        </Stack>
      ) : (
        <>
          {!isAuthenticated || pathname.includes('admin') || pathname.includes('vendor') ? (
            <IconButton ref={anchorRef} onClick={handleOpenUser} size="small" name="user-select">
              {user?.cover?.url ? (
                <BlurImageAvatar priority alt={user.firstName} src={user?.cover?.url} layout="fill" objectFit="cover" />
              ) : !isAuthenticated ? (
                <Avatar src="/broken-image.jpg" />
              ) : (
                <Avatar size="small">{user?.firstName?.slice(0, 1)?.toUpperCase()}</Avatar>
              )}
            </IconButton>
          ) : (
            <Typography
              variant="body1"
              color="text.primary"
              className={`link-text ${openUser && 'active'}`}
              ref={anchorRef}
              onClick={handleOpenUser}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'color 0.2s ease-in-out',
                fontSize: 14,
                '&:hover': {
                  color: (theme) => theme.palette.primary.main
                },
                '&.active': {
                  color: (theme) => theme.palette.primary.main
                }
              }}
            >
              Hi, {isAuthenticated && user.firstName + ' ' + user.lastName}{' '}
              <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
            </Typography>
          )}
          <MenuPopover
            open={openUser}
            onClose={handleCloseUser}
            anchorEl={anchorRef.current}
            sx={{
              width: 300
            }}
          >
            <UserList
              openUser={openUser}
              isAuthenticated={isAuthenticated}
              user={user}
              setOpen={() => setOpen(false)}
            />
          </MenuPopover>
        </>
      )}
    </Box>
  );
}
