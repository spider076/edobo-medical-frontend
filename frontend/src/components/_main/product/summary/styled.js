import { styled } from '@mui/material/styles';

const RootStyled = styled('div')(({ theme }) => ({
  '& .heading': {
    textTransform: 'capitalize',
    marginBottom: 0
  },
  '& .rating-wrapper': {
    position: 'relative',
    svg: {
      color: theme.palette.warning.main
    },
    p: {
      color: theme.palette.text.primary,
      span: {
        fontWeight: 400,
        color: theme.palette.primary.light
      }
    }
  },
  '& .text-price': {
    display: 'flex',
    alignItems: 'center',
    // marginLeft: 'auto',
    // position: 'absolute',
    // right: 0,
    // marginTop: theme.spacing(0.5),
    '& .old-price': {
      display: 'inline',
      color: 'text.disabled',
      textDecoration: 'line-through',
      fontSize: 16,
      fontWeight: 400,
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    }
  },
  '& .text-discount': {
    span: {
      color: theme.palette.error.main,
      marginLeft: theme.spacing(1)
    }
  },
  '& .color-picker-skeleton': {
    width: 120,
    height: 36,
    float: 'right'
  },
  '& .size-picker-skeleton': {
    width: 50,
    height: 18,
    float: 'right',
    marginTop: '12px'
  },
  '& .incrementer-wrapper': {
    marginTop: '5px',
    '& .incrementer-skeleton': {
      width: 70,
      height: 18,
      float: 'right',
      mt: '12px'
    },
    '& .incrementer': {
      padding: theme.spacing(0.5, 0.75),
      margin: theme.spacing(0, '5px'),
      borderWidth: 1,
      borderStyle: 'solid',
      lineHeight: 0,
      borderRadius: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      borderColor: theme.palette.divider,
      '& .text': {
        width: 40,
        textAlign: 'center',
        display: 'inline-block'
      },
      svg: {
        fontSize: theme.spacing(2)
      }
    }
  },
  '& .detail-actions-wrapper': {
    marginTop: theme.spacing(2),
    '& .contained-buttons': {
      width: '100%',
      '&.cart-button': {
        whiteSpace: 'nowrap'
      }
    },
    '& .progress': {
      width: '48px!important',
      height: '48px!important'
    }
    // '& .wishlist-button': {
    //   minHeight: 48,
    //   height: 48,
    //   borderRadius: '8px'
    // },

    // '& .remove-wishlist-button': {
    //   minHeight: 48,
    //   height: 48,
    //   borderRadius: '8px',

    //   '&.bg-grey': {
    //     backgroundColor: theme.palette.grey[500]
    //   }
    // }
  }
}));
export default RootStyled;
