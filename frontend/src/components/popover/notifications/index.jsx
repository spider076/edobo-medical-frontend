import React from 'react';
// mui
import { Badge, IconButton, Divider, Typography } from '@mui/material';
// icons
import { IoMdNotificationsOutline } from 'react-icons/io';

// components
import NotificationsList from 'src/components/lists/notifications';
import MenuPopover from 'src/components/popover/popover';

// ----------------------------------------------------------------------
export default function NotificationsPopover() {
  const anchorRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);
  const [state] = React.useState({
    notifications: null,
    loading: true
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge showZero={false} badgeContent={(!state.loading && state.notifications?.length) || 0} color="error">
          <IoMdNotificationsOutline />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          width: 360
        }}
      >
        <Typography variant="subtitle1" p={2}>
          Notifications
        </Typography>

        <Divider />
        {!state.loading && notifications?.length === 0 ? (
          <Typography variant="subtitle1" color="text.secondary" sx={{ p: 3 }}>
            No Notificaton Found
          </Typography>
        ) : (
          <NotificationsList loading={state.loading} notifications={state.notifications} handleClose={handleClose} />
        )}
      </MenuPopover>
    </>
  );
}
