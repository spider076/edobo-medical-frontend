import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from '../redux';
import { setLogout } from '../redux/slices/user';
import { setWishlist } from '../redux/slices/wishlist';

// cookies
import { deleteCookies } from 'src/hooks/cookies';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ user }) => user);
  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookies('token');
      dispatch(setLogout());
      dispatch(setWishlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return children;
}
