import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
// mui
import { FormGroup, FormControlLabel, Checkbox, Grid, Typography, Button, Zoom, Stack } from '@mui/material';
// icons
import { RiFontSize2 } from 'react-icons/ri';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Size({ ...props }) {
  const { sizes: filterSizes, path } = props;
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const sizes = searchParams.get('sizes');
  const [state, setstate] = useState({
    sizes: [],
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

  const handleChange = (props, e) => {
    var data = state.sizes;
    if (e.target.checked) {
      data = [...data, props];
      setstate({ ...state, sizes: [...state.sizes, props] });
      push(`${path}?` + createQueryString('sizes', [...state.sizes, props].join('_')));
    } else {
      const index = data.indexOf(props);
      data.splice(index, 1);
      if (data.length > 0) {
        const filtered = state.sizes.filter((sizes) => sizes !== props);
        setstate({ ...state, sizes: filtered });
        push(`${path}?` + createQueryString('sizes', filtered.join('_')));
      } else {
        const deleted = deleteQueryString('gender');
        push(path + '?' + deleted);
      }
    }
  };

  useEffect(() => {
    if (Boolean(sizes)) {
      setstate({
        ...state,
        sizes: [...sizes.split('_')]
      });
    } else {
      setstate({
        ...state,
        sizes: [],
        isLoaded: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: 'flex',
            gap: 1
          }}
          color="text.primary"
        >
          <RiFontSize2 size={20} /> Size {Boolean(state.sizes.length) && sizes && '(' + sizes?.split('_').length + ')'}
        </Typography>
        <Zoom in={Boolean(state.sizes.length)}>
          <Button
            onClick={() => {
              setstate({ ...state, sizes: [] });
              push(`${path}?${deleteQueryString('sizes')}`);
            }}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ float: 'right', mt: '-3px' }}
          >
            Reset
          </Button>
        </Zoom>
      </Stack>

      <Grid container>
        {filterSizes?.map((v) => (
          <Grid key={Math.random()} item xs={6}>
            <FormGroup>
              <FormControlLabel
                sx={{ textTransform: 'capitalize' }}
                name="sizes"
                checked={state.sizes.includes(v)}
                onChange={(e) => handleChange(v, e)}
                control={<Checkbox {...label} />}
                label={v}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
// add propTypes
Size.propTypes = {
  sizes: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};
