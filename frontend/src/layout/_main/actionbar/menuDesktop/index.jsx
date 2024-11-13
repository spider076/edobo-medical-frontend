import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next-nprogress-bar';

// material
import typography from 'src/theme/typography';
import { Link, Stack, Button, alpha, Box } from '@mui/material';

// icons
import { RxDashboard } from 'react-icons/rx';
import { FaAngleDown } from 'react-icons/fa6';

// components
import MenuDesktopPopover from 'src/components/popover/menuDesktop';

// api
import { useQuery } from 'react-query';
import * as api from 'src/services';

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isOffset: PropTypes.bool.isRequired,
  scrollPosition: PropTypes.any
};

function MenuDesktopItem({ ...props }) {
  const { item, pathname, isHome, isOpen, isOffset, onOpen, scrollPosition, onClose, isLoading, data } = props;
  const { title, path, isDropdown } = item;
  const anchorRef = React.useRef(null);
  const isActive = pathname === path;

  if (isDropdown) {
    return (
      <>
        <Box
          sx={{
            flexGrow: 1
          }}
        >
          <Button
            ref={anchorRef}
            className={` ${isOffset && isHome && 'offset'}`}
            id="composition-button"
            aria-controls={isOpen ? 'composition-menu' : undefined}
            aria-expanded={isOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={onOpen}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              boxShadow: 'none',
              borderRadius: 0,
              width: 280,
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.1),
              '&.arrow-icon': {
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }
            }}
            startIcon={<RxDashboard />}
            endIcon={<FaAngleDown size={14} className="arrow-icon" />}
          >
            {title}
          </Button>
        </Box>
        <MenuDesktopPopover
          isOpen={isOpen}
          scrollPosition={scrollPosition}
          onClose={onClose}
          isLoading={isLoading}
          data={data}
        />
      </>
    );
  }

  return (
    <Link
      component={NextLink}
      key={title}
      href={path}
      name={title}
      className={` ${isActive && 'active'}`}
      sx={{
        ...typography.subtitle1,
        color: 'common.white',
        textDecoration: 'none',
        fontWeight: 500,
        transition: '.2s ease-in',
        cursor: 'pointer',
        // '&:hover': {
        //   color: 'primary.main',
        //   textDecoration: 'none'
        // },
        '&.offset': {
          color: 'text.primary'
        },
        '&.active': {
          color: 'primary.main'
        },
        '& .link-icon': {
          ml: 0.5,
          fontSize: 16
        }
      }}
    >
      {title}
    </Link>
  );
}

export default function MenuDesktop({ ...props }) {
  const { isOffset, navConfig, isLeft } = props;

  const { data, isLoading } = useQuery(['get-categories-all'], () => api.getAllCategories());

  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [scrollPosition, setPosition] = useState(0);
  React.useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        width: 1,
        ...(isLeft && {
          ml: 0
        })
      }}
    >
      {navConfig.map((links) => (
        <MenuDesktopItem
          scrollPosition={scrollPosition}
          key={Math.random()}
          item={links}
          data={data?.data}
          isLoading={isLoading}
          pathname={pathname}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          router={router}
        />
      ))}
    </Stack>
  );
}

MenuDesktop.propTypes = {
  isLeft: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
  navConfig: PropTypes.array.isRequired
};
