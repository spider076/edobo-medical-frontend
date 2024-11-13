import React, { useCallback } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// mui
import { Button, ListItemIcon, Box } from '@mui/material';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// icons
import { FaCheck } from 'react-icons/fa6';
import { MdOutlineBrandingWatermark } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

GenderMain.propTypes = {
  genders: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};

export default function GenderMain({ ...props }) {
  const { genders, path } = props;
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const gender = searchParams.get('gender');
  const { push } = useRouter();

  const [state, setstate] = React.useState({
    genders: [],
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
  const deleteQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (props, val) => {
    var data = state.genders;
    if (val) {
      data = [...data, props];
      setstate({ ...state, genders: [...state.genders, props] });
      push(`${path}?` + createQueryString('gender', [...state.genders, props].join('_')));
    } else {
      const index = data.indexOf(props);
      data.splice(index, 1);
      if (data.length > 0) {
        const filtered = state.genders.filter((gen) => gen !== props);
        setstate({ ...state, genders: filtered });
        push(`${path}?` + createQueryString('gender', filtered.join('_')));
      } else {
        const deleted = deleteQueryString('gender');
        push(path + '?' + deleted);
      }
    }
  };
  React.useEffect(() => {
    if (Boolean(gender)) {
      setstate({
        ...state,
        genders: [...gender.split('_')]
      });
    } else {
      setstate({
        ...state,
        genders: [],
        isLoaded: true
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);
  const filteredWithoutEmpty = gender?.split('_').filter((v) => v !== '');
  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant={'outlined'}
        color={filteredWithoutEmpty?.length ? 'primary' : 'inherit'}
        startIcon={<MdOutlineBrandingWatermark />}
        endIcon={<IoIosArrowDown />}
        sx={{
          borderRadius: '20px'
        }}
      >
        Gender {filteredWithoutEmpty?.length ? '(' + filteredWithoutEmpty.join(', ') + ')' : null}
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
              {genders?.map((item, i) => (
                <React.Fragment key={item._id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={state.genders.includes(item)}
                      onClick={() => handleChange(item, !state.genders.includes(item))}
                    >
                      <ListItemText
                        primary={item}
                        sx={{
                          color: 'text.primary',
                          ...(state.genders.includes(item) && {
                            color: 'primary.main',
                            fontWeight: 700
                          })
                        }}
                      />
                      {state.genders.includes(item) ? (
                        <ListItemIcon sx={{ mr: 0, svg: { color: 'primary.main' } }}>
                          <FaCheck />
                        </ListItemIcon>
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                  {genders?.length - 1 === i ? null : <Divider />}
                </React.Fragment>
              ))}
            </List>
          </nav>
        </Box>
      </Popover>
    </>
  );
}
