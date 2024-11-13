import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// mui
import { FormGroup, FormControlLabel, Checkbox, Grid, Typography, Button, Stack, Zoom } from '@mui/material';
// icons
import { IoTransgender } from 'react-icons/io5';
import { IoMdMale, IoMdFemale, IoMdTransgender } from 'react-icons/io';
import { FaVenusMars } from 'react-icons/fa';
// next
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

GenderMain.propTypes = {
  genders: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const icons = {
  men: <IoMdMale size={20} />,
  women: <IoMdFemale size={20} />,
  kids: <FaVenusMars size={20} />,
  others: <IoMdTransgender size={20} />
};
export default function GenderMain({ ...props }) {
  const { genders, path } = props;
  const searchParams = useSearchParams();

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

  const handleChange = (props, e) => {
    var data = state.genders;
    if (e.target.checked) {
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
          <IoTransgender size={20} /> Gender{' '}
          {Boolean(state.genders.length) && gender && '(' + gender?.split('_').length + ')'}
        </Typography>
        {
          <Zoom in={state.genders.length}>
            <Button
              onClick={() => {
                setstate({ ...state, genders: [] });
                push(`${path}?${deleteQueryString('gender')}`);
              }}
              variant="outlined"
              color="primary"
              size="small"
              sx={{ float: 'right' }}
            >
              Reset
            </Button>
          </Zoom>
        }
      </Stack>

      <Grid container>
        {genders?.map((v) => (
          <Grid key={Math.random()} item xs={6}>
            <FormGroup>
              <FormControlLabel
                sx={{ textTransform: 'capitalize' }}
                name="gender"
                defaultChecked={state.genders.includes(v)}
                checked={state.genders.includes(v)}
                onChange={(e) => handleChange(v, e)}
                control={<Checkbox {...label} icon={icons[v.toLowerCase()]} checkedIcon={icons[v.toLowerCase()]} />}
                label={v.toLowerCase()}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
