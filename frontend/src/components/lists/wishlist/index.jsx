import React, { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
// mui
import {
  Box,
  List,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton
} from '@mui/material';
// components
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RootStyled from './styled';

// api
import * as api from 'src/services';
// redux
import { setWishlist } from 'src/redux/slices/wishlist';
import { useDispatch } from 'react-redux';

// Inside your functional component
Wishlist.propTypes = {
  item: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired
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

              <Stack direction="row" alignItems="center">
                <Skeleton variant="circular" height={14} width={14} />
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="text" width={140} />
                </Typography>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default function Wishlist({ ...props }) {
  const { item, isLast, isUser } = props;
  const router = useRouter();
  const t = (v) => v;
  // const { checkout } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const linkTo = `/products/${item.slug}`;
  const [isLoading, setLoading] = useState(false);
  const { mutate, isLoading: deleteLoading } = useMutation(api.updateWishlist, {
    onSuccess: (data) => {
      setLoading(false);
      toast.success('Removed item');
      dispatch(setWishlist(data.data));
    },
    onError: (err) => {
      setLoading(false);
      toast.error(t('common:errors.' + err.response.data.message));
    }
  });

  const onRemove = () => {
    mutate({
      pid: item._id
    });
  };
  return (
    <RootStyled>
      <List disablePadding>
        <ListItem>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
            className="main-stack"
          >
            <Stack
              direction="row"
              className={isUser && 'inner-stack'}
              sx={{ width: '100%' }}
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <ListItemAvatar>
                  <Avatar
                    onClick={() => router.push(linkTo)}
                    alt={item.name}
                    src={item.cover}
                    className="list-item-avatar"
                  />
                </ListItemAvatar>
                <ListItemText className="list-item-text">
                  <div>
                    <Typography
                      onClick={() => router.push(linkTo)}
                      variant="subtitle1"
                      color="text.primary"
                      noWrap
                      sx={{
                        cursor: 'pointer',
                        transition: 'ease-in-out 0.3s',
                        ':hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {item.name.slice(0, 40)}
                    </Typography>
                    <Typography className="list-item-text-span" component="span" variant="body2" color="text.primary">
                      In Stock: {''}
                      {item?.available} {''}Items
                    </Typography>
                  </div>
                </ListItemText>
              </Stack>

              <Stack justifyContent={'space-around'} sx={{ float: 'right' }}>
                <Box>
                  {deleteLoading ? (
                    <Skeleton variant="rectangular" width={32} height={32} className="list-skeleton" />
                  ) : (
                    <IconButton size="small" className="list-icon-btn" onClick={onRemove}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </ListItem>

        {!isLast && <Divider component="li" sx={{ mx: 1 }} />}
        {(isLoading ? Array.from(new Array(7)) : []).map(() => (
          <SkeletonComponent key={Math.random()} />
        ))}
      </List>
    </RootStyled>
  );
}
