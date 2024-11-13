import React, { useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';

// mui
import Pagination from '@mui/material/Pagination';

PaginationRounded.propTypes = {
  data: PropTypes.shape({
    count: PropTypes.number
  })
};

export default function PaginationRounded({ ...props }) {
  const { data } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [state, setstate] = React.useState(1);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event, value) => {
    setstate(value);
    router.push(`${pathname}?${createQueryString('page', value)}`);
  };
  React.useEffect(() => {
    if (page) {
      setstate(Number(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <Pagination
      count={Boolean(data?.count) ? data?.count : 1}
      page={state}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      color="primary"
      sx={{
        ml: 'auto',
        mb: 2,
        '.MuiPagination-ul': {
          justifyContent: 'center'
        }
      }}
    />
  );
}
