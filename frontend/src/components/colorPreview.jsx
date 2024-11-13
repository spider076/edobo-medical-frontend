import PropTypes from 'prop-types';
import React, { useState } from 'react';

// mui
import { Box, Stack, IconButton, Skeleton } from '@mui/material';

// icons
import { FaCheck } from 'react-icons/fa6';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md';

export default function ColorPreview({ ...props }) {
  const { colors, color, setColor, isDetail, loading } = props;

  const [colorCount, setColorCount] = useState(0);

  return (
    <Stack direction="row" spacing={0.5}>
      {!isDetail && colors?.length > 6 && (
        <IconButton
          size="small"
          onClick={() => {
            if (colorCount > 0) {
              setColorCount(colorCount - 1);
            }
          }}
          sx={{
            width: 24,
            height: 24,
            p: 0.1,
            svg: {
              color: colorCount === 0 ? 'text.disabled' : 'text.primary'
            }
          }}
          disabled={colorCount === 0}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </IconButton>
      )}
      {loading
        ? Array.from(new Array(4))
        : colors?.slice(colorCount * 6, 6 * (colorCount + 1)).map((v, i) => (
            <React.Fragment key={Math.random()}>
              {loading ? (
                <Skeleton variant="circular" width={24} height={24} />
              ) : (
                <Box
                  sx={{
                    height: 24,
                    width: 24,
                    borderRadius: 5,
                    bgcolor: v,
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: 'inset 0 0 2px #C4CDD5',
                    ...(color === colorCount * 6 + i && {
                      svg: {
                        position: 'absolute',
                        color: v === 'white' ? 'common.black' : 'common.white',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                      }
                    })
                  }}
                  onClick={() => setColor(colorCount * 6 + i)}
                >
                  {color === colorCount * 6 + i && <FaCheck />}
                </Box>
              )}
            </React.Fragment>
          ))}
      {!isDetail && colors?.length > 6 && (
        <IconButton
          disabled={6 * (colorCount + 1) > colors?.length}
          sx={{
            width: 24,
            height: 24,
            p: 0.1,
            svg: {
              color: 6 * (colorCount + 1) > colors?.length ? 'text.disabled' : 'text.primary'
            }
          }}
          size="small"
          onClick={() => {
            if (6 * (colorCount + 1) < colors?.length) {
              setColorCount(colorCount + 1);
            }
          }}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </IconButton>
      )}
    </Stack>
  );
}
ColorPreview.propTypes = {
  colors: PropTypes.array.isRequired,
  color: PropTypes.number.isRequired,
  setColor: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};
