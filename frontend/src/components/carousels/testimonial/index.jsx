// react
'use client';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Image from 'next/image';

// mui
import { Box, Typography, Card, Stack, Rating, Avatar } from '@mui/material';
// icons
import { GoVerified } from 'react-icons/go';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';

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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
TestimonialDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired
};

function TestimonialDetailsCarousel({ ...props }) {
  const { item } = props;

  return (
    <div className="slide-wrapper">
      {item && (
        <Card
          sx={{
            p: 2,
            width: '100%',
            maxWidth: 500,
            ml: 'auto'
          }}
        >
          <Stack spacing={2} alignItems="center" justifyContent="center" textAlign="center">
            <Rating value={5} readOnly size="small" />
            <Typography variant="body1">{item.reviewdetail}</Typography>
            <Image
              priority
              component={Avatar}
              src={item.cover.url}
              placeholder="blur"
              alt="avatar"
              responsive
              static
              dragable={false}
              height={80}
              width={80}
              sizes="100px"
              style={{
                borderRadius: 50
              }}
            />
            <Stack spacing={0.5} alignItems="center" justifyContent="center" textAlign="center">
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body1">{item.jobTitle}</Typography>
            </Stack>
          </Stack>
        </Card>
      )}
    </div>
  );
}

export default function TestimonialCarousel({ ...props }) {
  const { page, direction, paginate, imageIndex, images } = props;
  const { themeMode } = useSelector(({ settings }) => settings);
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <Stack
        direction="row"
        alignItems="end"
        justifyContent="center"
        spacing={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          pt: { xs: '50%', sm: '30%', md: 'unset' },
          pb: { xs: '50%', sm: '30%', md: 'unset' },
          '& .motion-dev': {
            position: 'absolute',
            width: '100%',
            //   overflow: 'hidden',
            top: 0
          }
        }}
      >
        <Card
          sx={{
            display: { xs: 'none', md: 'flex' },
            mr: 'auto',
            ml: 8,
            bgcolor: 'primary.main',
            p: 2,
            color: 'common.white',
            minWidth: 210,
            zIndex: 99
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <GoVerified size={40} />
            <Stack spacing={0}>
              <Typography variant="subtitle2">{images[imageIndex].reviews}/5</Typography>
              <Rating value={images[imageIndex].reviews} readOnly size="small" />
              <Typography variant="subtitle2">{images[imageIndex].reviews} Customer review</Typography>
            </Stack>
          </Stack>
        </Card>
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
            <TestimonialDetailsCarousel
              themeMode={themeMode}
              item={images[imageIndex]}
              index={images[imageIndex]}
              activeStep={imageIndex}
              isActive={imageIndex}
              key={Math.random()}
            />
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Box>
  );
}
TestimonialCarousel.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object
};
