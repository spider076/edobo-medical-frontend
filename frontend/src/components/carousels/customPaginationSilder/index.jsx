// react
'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import BlurImage from 'src/components/blurImage';
// mui
import { Box, Stack } from '@mui/material';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// styles
import RootStyled from './styled';

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
ProductDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired
};

function ProductDetailsCarousel({ ...props }) {
  const { item } = props;

  return (
    <div className="slide-wrapper">
      {item && (
        <BlurImage
          priority
          fill
          objectFit="cover"
          sizes="50%"
          src={item?.url || item?.src}
          alt="hero-carousel"
          placeholder="blur"
          blurDataURL={item.blurDataURL}
        />
      )}
      <Box className="bg-overlay" />
    </div>
  );
}

export default function CarouselAnimation({ ...props }) {
  const { product } = props;

  const images = product?.images;

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images?.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <RootStyled>
      <div className="carousel-wrap">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="motion-dev"
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
            <ProductDetailsCarousel item={images[imageIndex]} />
          </motion.div>
        </AnimatePresence>
        <Stack
          direction="row"
          justifyContent={images.length < 6 ? 'center' : 'left'}
          spacing={1}
          className="controls-wrapper"
        >
          {images.map((item, i) => (
            <Box
              key={Math.random()}
              className={`controls-button ${imageIndex === i ? 'active' : ''}`}
              onClick={() => {
                setPage([i, i]);
              }}
            >
              <BlurImage
                priority
                fill
                objectFit="cover"
                sizes="14vw"
                src={item?.src || item?.url}
                alt="hero-carousel"
                placeholder="blur"
                blurDataURL={item.blurDataURL}
              />
            </Box>
          ))}
        </Stack>
      </div>
    </RootStyled>
  );
}
CarouselAnimation.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object
};
