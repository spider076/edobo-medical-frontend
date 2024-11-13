// react
'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// mui
import { Paper, useMediaQuery, Grid, Fab, Stack } from '@mui/material';
// icons
import { IoArrowForward } from 'react-icons/io5';
import { IoArrowBackOutline } from 'react-icons/io5';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// components
import ProductCard from 'src/components/cards/product';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
function CarouselItem({ ...props }) {
  const { index, isLoading } = props;

  return (
    <Paper
      className="slide-wrapper"
      elevation={0}
      sx={{
        position: 'relative',
        pb: { md: '38%', sm: '82%', xs: '142%' },
        zIndex: 11,
        bgcolor: 'transparent',
        borderRadius: 0
      }}
    >
      <ProductCard loading={isLoading} product={index} />
    </Paper>
  );
}

function isFloat(number) {
  return Number(number) === number && number % 1 !== 0;
}

ProductsCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default function ProductsCarousel({ ...props }) {
  const { data, isLoading } = props;

  const isLarge = useMediaQuery('(min-width:1200px)');
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isTablet = useMediaQuery('(min-width:600px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const { themeMode } = useSelector(({ settings }) => settings);

  const [[page, direction], setPage] = useState([0, 0]);
  var slidesToShow = isLarge ? 4 : isDesktop ? 3 : isTablet ? 2 : isMobile ? 2 : 4;
  var total = data?.length / slidesToShow;
  var totalSlides = total === 0 ? 0 : isFloat(total) ? Math.floor(total) + 1 : total;

  const imageIndex = page;

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= totalSlides - 1) {
      setPage([nextPage, newDirection]);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        borderRadius: 0,
        width: '100%',
        marginLeft: 0,
        '& .slide-wrapper ': {
          paddingBottom: '60%'
        }
      }}
    >
      <Paper
        className="main-paper"
        elevation={0}
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: { lg: '35%', md: '44%', sm: '73%', xs: '86%' },
          overflow: 'hidden',
          width: { xs: '100%', sm: 'calc(100% + 48px)' },
          // width: 'calc(100% + 48px)',
          ml: { xs: 0, md: '-24px' },
          '& .motion-dev': {
            pl: { md: `24px !important`, xs: `0px !important` },
            pr: { md: `24px !important`, xs: `0px !important` }
          }
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="motion-dev"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              top: 0
            }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              {(isLoading
                ? Array.from(new Array(4))
                : data?.slice(imageIndex * slidesToShow, (imageIndex + 1) * slidesToShow)
              ).map((item) => (
                <Grid item lg={3} md={4} sm={6} xs={6} key={Math.random()}>
                  <CarouselItem
                    themeMode={themeMode}
                    item={data ? item : null}
                    index={data ? item : null}
                    activeStep={imageIndex}
                    isActive={imageIndex}
                    key={Math.random()}
                    isLoading={isLoading}
                  />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Paper>
      {!isLoading && (
        <Stack
          direction={'row'}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          className="slider-arrows"
        >
          <Fab
            color="primary"
            aria-label="back"
            size="small"
            className="left"
            onClick={() => paginate(-1)}
            disabled={page === 0}
            sx={{
              display: page === 0 ? 'none' : 'flex',
              position: 'absolute',
              transform: 'translateY(-50%)',
              left: '-1.5%',
              top: '40%',
              transition: 'all 0.2s ease-in-out',
              zIndex: 11
            }}
          >
            <IoArrowBackOutline size={isMobile ? 16 : 24} />
          </Fab>
          <Fab
            color="primary"
            aria-label="forward"
            size="small"
            className="right"
            onClick={() => paginate(1)}
            disabled={totalSlides - 1 === page}
            sx={{
              display: totalSlides - 1 === page ? 'none' : 'flex',
              transform: 'translateY(-50%)',
              right: '-1.5%',
              top: '40%',
              transition: 'all 0.2s ease-in-out',
              position: 'absolute',
              zIndex: 11
            }}
          >
            <IoArrowForward size={isMobile ? 16 : 24} />
          </Fab>
        </Stack>
      )}
    </Paper>
  );
}
CarouselItem.propTypes = {
  index: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};
