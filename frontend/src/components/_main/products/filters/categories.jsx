'use client';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// icons
import { IoIosArrowDown } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';

export default function Filters() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const path = '/products';
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { push } = useRouter();
  const searchParams = useSearchParams();

  const categories = searchParams.get('categories');

  const [state, setstate] = useState({
    categories: [],
    isLoaded: false
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (props, val) => () => {
    var data = state.categories;

    if (val) {
      data = [...data, props];

      setstate({ ...state, categories: [...data] });
      push(`${path}?` + createQueryString('categories', [...state.categories, props].join('_')));
    } else {
      const index = data.indexOf(props);
      data.splice(index, 1);
      if (data.length > 0) {
        const filtered = state.categories.filter((categories) => categories !== props);
        setstate({ ...state, categories: filtered });
        push(`${path}?` + createQueryString('categories', filtered.join('_')));
      } else {
        push(`${path}?` + createQueryString('categories', ''));
      }
    }
  };

  useEffect(() => {
    if (Boolean(categories)) {
      setstate({
        ...state,
        categories: [...categories.split('_')]
      });
    } else {
      setstate({
        ...state,
        categories: [],
        isLoaded: true
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        startIcon={<RxDashboard />}
        endIcon={<IoIosArrowDown />}
        sx={{
          borderRadius: '27px'
        }}
      >
        Categories
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ width: 200 }}>
          <nav aria-label="secondary mailbox folders">
            <List>
              {[
                {
                  _id: 'abc',
                  name: 'Shoes',
                  slug: 'shoes'
                },
                {
                  _id: 'def',
                  name: 'shirts',
                  slug: 'shirts'
                }
              ].map((item) => (
                <React.Fragment key={item._id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={state.categories.includes(item.slug)}
                      onClick={handleChange(item.slug, !state.categories.includes(item.slug))}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </nav>
        </Box>
      </Popover>
      {/* <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        startIcon={<AiOutlineDollar />}
        endIcon={<IoIosArrowDown />}
        sx={{
          borderRadius: '27px'
        }}
      >
        Price
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ width: 200 }}>
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="0 - 100$" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover> */}
    </>
  );
}
