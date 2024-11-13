import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';
// mui
import { FormGroup, FormControlLabel, Radio, Grid, Typography, Button, Stack, Zoom } from '@mui/material';
// icons
import { MdOutlineBrandingWatermark } from 'react-icons/md';

const BrandMain = ({ brands, path }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const { push } = router;

  const [selectedBrand, setSelectedBrand] = useState('');
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
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
  const handleChange = (event) => {
    const slug = event.target.value;
    setSelectedBrand(slug);

    const queryString = createQueryString('brand', slug);
    push(`${path}?${queryString}`);
  };

  useEffect(() => {
    setSelectedBrand(brand || '');
  }, [brand]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          color="text.primary"
        >
          <MdOutlineBrandingWatermark fontSize="large" /> Brand
        </Typography>
        <Zoom in={Boolean(selectedBrand)}>
          <Button
            onClick={() => {
              setSelectedBrand('');
              push(`${path}?${deleteQueryString('brand')}`);
            }}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ float: 'right' }}
          >
            Reset
          </Button>
        </Zoom>
      </Stack>

      <Grid container>
        {brands?.map((brand) => (
          <Grid key={brand.slug} item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Radio />}
                label={brand.name}
                value={brand.slug}
                checked={selectedBrand === brand.slug}
                onChange={handleChange}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BrandMain;

BrandMain.propTypes = {
  brands: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};
