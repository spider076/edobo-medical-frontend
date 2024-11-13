// react
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';

// mui ui
import { styled } from '@mui/material/styles';
import { Box, OutlinedInput, InputAdornment } from '@mui/material';

// icons
import { IoIosSearch } from 'react-icons/io';

const RootStyle = styled(Box)(() => ({
  maxHeight: 96,
  display: 'flex',
  justifyContent: 'space-between'
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 250,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),

  '&.Mui-focused': { width: 300 },
  [theme.breakpoints.down('sm')]: {
    width: 150,
    '&.Mui-focused': { width: 150 }
  }
}));

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usedSearch = searchParams.get('search');
  const [initial, setInitial] = useState(false);
  const [search, setSearch] = useState(usedSearch || '');
  const onChange = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.delete('page');

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (Boolean(search)) {
        setInitial(true);
        router.push(`${pathname}?${createQueryString('search', search)}`);
      } else {
        if (initial) {
          router.push(`${pathname}`);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <RootStyle>
      <SearchStyle
        value={search}
        onChange={onChange}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IoIosSearch size={20} style={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />
    </RootStyle>
  );
}
