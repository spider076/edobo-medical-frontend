import PropTypes from 'prop-types';

// mui
import { styled } from '@mui/material/styles';
import { Grid, Button, Typography, LinearProgress, Stack, Box, Rating } from '@mui/material';
// icons
import { MdEdit } from 'react-icons/md';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

ReviewOverview.propTypes = {
  totalRating: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
  reviewsSummery: PropTypes.array.isRequired,
  totalReviews: PropTypes.number.isRequired
};

ProgressItem.propTypes = {
  star: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  '&.border-bottom': {
    borderBottom: `solid 1px ${theme.palette.divider}`
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: `solid 1px ${theme.palette.divider}`
  }
}));

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number
};

function ProgressItem({ ...props }) {
  const { star, name, total } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(star / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider'
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
        {fShortenNumber(star)}
      </Typography>
    </Stack>
  );
}

ReviewOverview.propTypes = {
  onOpen: PropTypes.func
};

export default function ReviewOverview({ ...props }) {
  const { totalRating, onOpen, reviewsSummery, totalReviews } = props;

  return (
    <Box
      sx={{
        height: 1,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Grid container>
        <GridStyle item xs={12} className="border-bottom">
          <Typography variant="h2" gutterBottom sx={{ color: 'error.main', mb: 0 }} lineHeight={1}>
            {totalReviews === 0 ? 0 : totalRating?.toFixed(1)}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            ({fShortenNumber(totalReviews)}
            &nbsp; {totalReviews > 1 ? 'reviews' : 'review'})
          </Typography>
          <RatingStyle readOnly value={totalRating} precision={0.1} />

          <Stack sx={{ width: 1, mb: 1 }} flexDirection="column-reverse">
            {Array.from(new Array(5)).map((rating, index) => {
              const match = reviewsSummery.find((v) => v._id === index + 1);

              return (
                <ProgressItem key={Math.random()} star={match?.count || 0} name={index + 1} total={totalReviews} />
              );
            })}
          </Stack>
          <Button size="large" onClick={onOpen} variant="outlined" startIcon={<MdEdit />} fullWidth>
            Write A Review
          </Button>
        </GridStyle>
      </Grid>
    </Box>
  );
}
