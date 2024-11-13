import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';

// mui
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { Box, Stack, Zoom, Button, Typography, Tooltip } from '@mui/material';

// icons
import { IoPricetagOutline } from 'react-icons/io5';

// custom hooks
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import { useCurrencyConvert } from 'src/hooks/convertCurrency';

CustomizedSlider.propTypes = {
  prices: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};

function ValueLabelComponent({ ...props }) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value} size="small">
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: 20,
  height: 27,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid currentColor',

    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  '& .MuiSlider-track': {
    height: 27,
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 27,
    borderRadius: '8px'
  }
}));

function AirbnbThumbComponent({ ...props }) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}
AirbnbThumbComponent.propTypes = {
  children: PropTypes.node
};

export default function CustomizedSlider({ ...props }) {
  const { prices: filterPrices, path } = props;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const prices = searchParams.get('prices');
  const [state, setstate] = React.useState([0, 10000]);

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
  React.useEffect(() => {
    if (Boolean(prices)) {
      setstate([cCurrency(Number(prices.split('_')[0])), cCurrency(Number(prices.split('_')[1]))]);
    } else {
      setstate([0, 100000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          color="text.primary"
        >
          <IoPricetagOutline size={20} /> Price Range
        </Typography>
        <Zoom in={Boolean(prices)}>
          <Button
            onClick={() => {
              setstate([0, 10000]);
              push(`${path}?${deleteQueryString('prices')}`);
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

      <Box px={1} mt={1}>
        <AirbnbSlider
          valueLabelDisplay="on"
          onChangeCommitted={(e, value) => {
            const prices = typeof value === 'object' && value.join('_');
            push(`${path}?` + createQueryString('prices', prices));
          }}
          valueLabelFormat={(x) => fCurrency(x)}
          max={cCurrency(filterPrices[1])}
          components={{ Thumb: AirbnbThumbComponent }}
          value={state}
          onChange={(e, v) => setstate(v)}
          disableSwap
          // marks
        />
      </Box>
    </>
  );
}
