'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'src/redux';
import { useRouter } from 'next-nprogress-bar';

// components
import Loading from 'src/components/loading';
export default function Guest({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      setAuth(false);
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return <Loading />;
  }

  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
