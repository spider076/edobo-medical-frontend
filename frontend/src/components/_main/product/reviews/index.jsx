import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';
// mui
import { Collapse, Grid, Card } from '@mui/material';
// components
import ReviewForm from 'src/components/forms/reviews';
import ReviewOverview from 'src/components/_main/product/reviews/overview';
import ReviewsList from 'src/components/lists/reviews';
import NoDataFoundIllustration from 'src/illustrations/dataNotFound';

ProductReview.propTypes = {
  pid: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  totalRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviewsSummery: PropTypes.object.isRequired
};

export default function ProductReview({ ...props }) {
  const { pid, reviews, totalRating, totalReviews, reviewsSummery } = props;
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [state, setstate] = useState([]);
  const [reviewBox, setReviewBox] = useState(false);
  const { isAuthenticated } = useSelector(({ user }) => user);
  const handleOpenReviewBox = () => {
    isAuthenticated ? setReviewBox((prev) => !prev) : router.push('/auth/login?redirect=' + router.asPath);
  };
  const handleCloseReviewBox = () => {
    setReviewBox(false);
    setTimeout(() => {
      setCount(count + 1);
    }, 500);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Collapse in={reviewBox}>
          <Card sx={{ mb: 3 }}>
            <ReviewForm
              onAddingReview={(v) => setstate([v, ...state])}
              pid={pid}
              onClose={handleCloseReviewBox}
              id="move_add_review"
              onClickCancel={() => setReviewBox(false)}
            />
          </Card>
        </Collapse>
        <Collapse in={!reviewBox}>
          <Card>
            {[...state, ...reviews]?.length ? (
              <ReviewsList reviews={[...state, ...reviews]} />
            ) : (
              <NoDataFoundIllustration />
            )}
          </Card>
        </Collapse>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ position: 'sticky', top: 156 }}>
          <ReviewOverview
            totalRating={totalRating}
            totalReviews={totalReviews}
            reviews={[...state, ...reviews]}
            onOpen={handleOpenReviewBox}
            reviewsSummery={reviewsSummery}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
