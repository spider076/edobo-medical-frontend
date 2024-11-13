import React from 'react';
// mui
import { IconButton, Stack, Radio } from '@mui/material';
import { alpha } from '@mui/material/styles';
// icons
import { IoArrowBack, IoArrowForwardOutline } from 'react-icons/io5';
import { GoDotFill, GoDot } from 'react-icons/go';

export default function actions({ active, paginate, data, setPage }) {
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={{
        p: 0.5,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
        backdropFilter: 'blur(3px)',

        zIndex: 11,
        borderRadius: '27px',
        position: 'absolute',
        left: '50%',
        bottom: '10px',
        transform: 'translateX(-50%)',
        display: { md: 'flex', xs: 'none' }
      }}
    >
      <IconButton size="small" aria-label="back" onClick={() => paginate(-1)} sx={{ width: 30, height: 30 }}>
        <IoArrowBack />
      </IconButton>
      {data.map((item, i) => (
        <Radio
          key={i}
          checkedIcon={<GoDotFill />}
          icon={<GoDot />}
          size="small"
          checked={i === active}
          //   onChange={handleChange}
          value={i}
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}
          sx={{ width: 20, height: 20, p: 0.1 }}
          onClick={() => setPage([i, i <= active ? -1 : 1])}
        />
      ))}

      <IconButton size="small" aria-label="back" onClick={() => paginate(1)} sx={{ width: 30, height: 30 }}>
        <IoArrowForwardOutline />
      </IconButton>
    </Stack>
  );
}
