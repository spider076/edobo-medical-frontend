import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { useRef, useState } from 'react';
import { enUS } from 'date-fns/locale';
import { useRouter } from 'next-nprogress-bar';

// mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  IconButton
} from '@mui/material';

// component
import { Popover as MenuPopover } from 'src/components/popover';
import NoDataFoundIllustration from 'src/illustrations/dataNotFound';

// icons
import { GoClock } from 'react-icons/go';
import { IoNotificationsOutline } from 'react-icons/io5';
import { TbCheck } from 'react-icons/tb';
import { TbChecks } from 'react-icons/tb';

// api
import { useQuery } from 'react-query';
import * as api from 'src/services';

// ----------------------------------------------------------------------

const NotificationPopover = ({ item, onClose }) => {
  const router = useRouter();
  console.log(item, 'order id ');
  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          router.push(`/admin/orders/${item?.orderId}`);
          onClose();
        }}
        sx={{
          bgcolor: (theme) => (item?.opened ? theme.palette.background.paper : 'rgba(145, 158, 171, 0.08)')
        }}
      >
        <ListItemAvatar>
          <Avatar alt={item?.title.slice(3, 4) || ''} src={item?.avatar} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                color="text.primary"
                dangerouslySetInnerHTML={{
                  __html: `${item?.title}`
                }}
              />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <GoClock size={14} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDistanceToNow(new Date(item?.createdAt), { enUS })}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    color: item?.opened ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {item?.opened ? <TbChecks size={16} /> : <TbCheck size={16} />}
                </Box>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider component="li" />
    </>
  );
};

const SkeletonComponent = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography variant="body2" color="text.primary">
                <Skeleton variant="text" />
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Skeleton variant="circular" height={14} width={14} sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton variant="text" width={140} />
                  </Typography>
                </Stack>
                <Skeleton variant="circular" height={14} width={14} />
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
NotificationPopover.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default function NotificationsPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const { data, isLoading } = useQuery(['notification', page], () => api.getNotifications(page * 10), {
    refetchInterval: 10000,
    onSuccess: (newData) => {
      setNotifications([...newData.data]);
    }
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={data?.totalUnread} color="error">
          <IoNotificationsOutline size={24} />
        </Badge>
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 360 }}>
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Notifications</Typography>
            </Box>
          </Box>

          <Divider />
          {notifications?.length < 1 ? (
            <NoDataFoundIllustration />
          ) : (
            <Box sx={{ height: { xs: 340, sm: 400, md: 460 }, overflow: 'auto' }}>
              <List disablePadding sx={{ '& .MuiListItemAvatar-root': { mt: 0 } }}>
                {notifications?.map((item) => (
                  <NotificationPopover
                    key={Math.random()}
                    isLoading={isLoading}
                    item={item}
                    onClose={() => handleClose()}
                  />
                ))}
                {(isLoading ? Array.from(new Array(7)) : []).map((v) => (
                  <SkeletonComponent key={Math.random() || v} />
                ))}
              </List>
              <Box textAlign="center">
                {!isLoading && data.totalNotifications > 1 && data.totalNotifications !== page && (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ my: 2 }}
                    size="small"
                    onClick={() => setPage(page + 1)}
                  >
                    View more
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </>
      </MenuPopover>
    </>
  );
}
