import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// mui
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography, FormHelperText, Stack, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// react
import { useMutation } from 'react-query';
// api
import * as api from 'src/services';
import axios from 'axios';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// dynamic
const UploadMultiFile = dynamic(() => import('src/components/upload/UploadMultiFile'));

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  //   borderRadius: theme.shape.borderRadiusMd,
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default
}));
export default function ProductDetailsReviewForm({ ...props }) {
  const { onClose, pid, onClickCancel, onAddingReview, ...other } = props;
  const [loading, setloading] = React.useState(false);
  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    review: Yup.string().required('Review is required')
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      review: '',
      images: [],
      blob: []
    },
    validationSchema: ReviewSchema,
    onSubmit: async () => {
      mutate({
        rating: values.rating,
        review: values.review,
        images: values.images.map((v) => v.url),
        pid: pid
      });
    }
  });

  const { values, errors, touched, resetForm, handleSubmit, setFieldValue, getFieldProps } = formik;
  const { mutate, isLoading } = useMutation(api.addReview, {
    onSuccess: ({ data, user }) => {
      onAddingReview({ ...data, user });
      toast.success('Added review');
      resetForm();
      onClose();
    }
  });
  const onCancel = () => {
    onClickCancel();
    resetForm();
  };
  const handleDrop = (acceptedFiles) => {
    setloading(true);
    const uploaders = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
      setFieldValue('blob', values.blob.concat(acceptedFiles));
      // ${process.env.CLOUDINARY_CLOUD_NAME}
      return axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
    });
    const blobs = acceptedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    axios.all(uploaders).then((data) => {
      const newImages = data.map(({ data }, i) => ({
        url: data.secure_url,
        _id: data.public_id,
        blob: blobs[i]
      }));
      setloading(false);
      setFieldValue('images', values.images.concat(newImages));
    });
  };

  const handleRemoveAll = () => {
    values.images.forEach((image) => {
      deleteMutate({ _id: image._id });
    });
    setFieldValue('images', []);
  };
  const handleRemove = (file) => {
    const removeImage = values.images.filter((_file) => {
      if (_file._id === file._id) {
        deleteMutate({ _id: file._id });
      }
      return _file !== file;
    });
    setFieldValue('images', removeImage);
  };
  return (
    <RootStyle {...other}>
      <Typography variant="subtitle1" gutterBottom>
        Add Review
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}>
              <Typography variant="body2">Your Review About</Typography>
              <Rating
                {...getFieldProps('rating')}
                onChange={(event) => setFieldValue('rating', Number(event.target.value))}
              />
            </Stack>
            {errors.rating && <FormHelperText error>{touched.rating && 'Rating Required'}</FormHelperText>}

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Review"
              type="text"
              {...getFieldProps('review')}
              error={Boolean(touched.review && errors.review)}
              helperText={touched.review && errors.review}
            />
            <UploadMultiFile
              showPreview
              maxSize={3145728}
              accept="image/*"
              files={values.images}
              loading={loading}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              blob={values.blob}
              error={Boolean(touched.images && errors.images)}
            />
            {touched.images && errors.images && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.images && errors.images}
              </FormHelperText>
            )}
            <Stack direction="row" justifyContent="flex-end">
              <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ mr: 1.5 }}>
                Cancel
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                Post Review
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
ProductDetailsReviewForm.propTypes = {
  onClose: PropTypes.func,
  pid: PropTypes.string,
  onClickCancel: PropTypes.func,
  onAddingReview: PropTypes.func
};
