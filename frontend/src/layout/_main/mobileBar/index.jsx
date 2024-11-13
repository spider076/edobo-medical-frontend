'use client';
// react
import * as React from 'react';
import { sum } from 'lodash';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useSelector } from 'react-redux';

// mui
import { Box, Badge, Button } from '@mui/material';

// icons
import { HiOutlineHome, HiHome } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { BsShopWindow } from 'react-icons/bs';
import { HiShoppingBag, HiOutlineShoppingBag } from 'react-icons/hi';
import { FaRegUser } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';

// styles
import RootStyled from './styled';

// config
import config from 'src/layout/_main/config.json';

const getIcon = (href, totalItems) => {
  switch (href) {
    case '/':
      return <HiOutlineHome size={18} />;
    case '/search':
      return <IoSearch size={18} />;
    case '/cart':
      return (
        <Badge
          showZero
          badgeContent={totalItems}
          color="error"
          max={99}
          sx={{ zIndex: 0, span: { top: '4px', right: '-2px' } }}
        >
          <HiOutlineShoppingBag size={18} />
        </Badge>
      );
    case '/products':
      return <BsShopWindow size={18} />;
    default:
      return <FaRegUser size={18} />;
  }
};

const getActiveIcon = (href, totalItems) => {
  switch (href) {
    case '/':
      return <HiHome size={18} />;
    case '/search':
      return <IoSearch size={18} />;
    case '/cart':
      return (
        <Badge
          showZero={false}
          badgeContent={totalItems}
          color="error"
          max={99}
          sx={{ zIndex: 0, span: { top: '4px', right: '-2px' } }}
        >
          <HiShoppingBag size={18} />
        </Badge>
      );
    case '/products':
      return <BsShopWindow size={18} />;
    default:
      return <FaUser size={18} />;
  }
};

export default function MobileBar() {
  const { mobile_menu } = config;
  const { push } = useRouter();
  const pathname = usePathname();
  const { product, user } = useSelector((state) => state);
  const { checkout } = useSelector(({ product }) => product);
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({
    product: null,
    user: null
  });

  const [cart, setCart] = React.useState([]);
  const totalItems = sum(cart.map((item) => item.quantity));
  const onChangeMenu = (href, i) => () => {
    push(href);
    setIndex(i);
  };

  React.useEffect(() => {
    const isActiveIndex = () => {
      setState({
        product,
        user
      });
      const index =
        pathname.includes('/auth') || pathname.includes('/profile')
          ? 4
          : pathname.includes('/cart')
            ? 3
            : pathname.includes('/products')
              ? 2
              : pathname.includes('/search')
                ? 1
                : 0;
      return index;
    };
    setIndex(isActiveIndex());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  React.useEffect(() => {
    setCart(checkout.cart);
  }, [checkout]);

  return (
    <RootStyled>
      <Box className="appbar-wrapper">
        {mobile_menu.map((v, i) => (
          <Button
            variant={index === i ? 'contained' : 'text'}
            color={index === i ? 'primary' : 'inherit'}
            startIcon={
              index === i
                ? getActiveIcon(v.href, totalItems, state.notification)
                : getIcon(v.href, totalItems, state.notification)
            }
            key={Math.random()}
            size="large"
            className="nav-button"
            sx={{
              borderRadius: i === 0 ? '0 6px 0 0' : i === 4 ? '6px 0 0 0' : '6px 6px 0 0',
              fontWeight: index === i ? 600 : 400
            }}
            onClick={onChangeMenu(user?.isAuthenticated && v.isUser ? '/profile' : v.href, i)}
          >
            {v.name}
          </Button>
        ))}
      </Box>
    </RootStyled>
  );
}
