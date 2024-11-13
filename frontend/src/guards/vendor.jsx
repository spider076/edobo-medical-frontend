'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import { useSelector } from 'src/redux';
import { toast } from 'react-hot-toast';

// components
import Loading from 'src/components/loading';

export default function Guest({ children }) {
  const router = useRouter();
  const [isVendor, setVendor] = useState(true);
  const { isAuthenticated, user } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'vendor') {
      setVendor(false);
      toast.error("You're not allowed to access vendor dashboard");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isVendor) {
    return <Loading />;
  }
  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
