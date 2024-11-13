//
'use client';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

// mui
import { Box, Link, Button, Stack, Typography, alpha, useTheme } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';

// components
import { MBreadcrumbs } from './@material-extend';
import { createGradient } from 'src/theme/palette';

export default function HeaderBreadcrumbs({ ...props }) {
  const { links, action, icon, heading, moreLink = '' || [], sx, admin, ...other } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: '100%',
        ...(admin && {
          mb: 3
        }),
        ...(!admin && {
          p: 3,
          mt: 3,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          background: createGradient(theme.palette.primary.main, theme.palette.primary.dark),
          borderRadius: '8px',
          border: `1px solid ${theme.palette.primary}`,
          '&:before': {
            content: "''",
            position: 'absolute',
            top: '-23%',
            left: '20%',
            transform: 'translateX(-50%)',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0
          },
          '&:after': {
            content: "''",
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '-3%',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0
          },
          '& .MuiBreadcrumbs-separator': {
            color: 'common.white'
          }
        })
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          ...(!admin && {
            '&:before': {
              content: "''",
              position: 'absolute',
              bottom: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: alpha(theme.palette.primary.light, 0.5),
              height: { xs: 60, md: 80 },
              width: { xs: 60, md: 80 },
              borderRadius: '50px',
              zIndex: 0
            }
          })
        }}
      >
        <Box
          sx={{
            width: '50%'
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ textTransform: 'capitalize', width: '80vw' }} noWrap>
            {heading}
          </Typography>

          <MBreadcrumbs icon={icon} admin={admin} links={links} {...other} />
        </Box>

        {action ? (
          action.href ? (
            <>
              <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={NextLink}
                  href={action.href}
                  startIcon={action.icon ? action.icon : <IoMdAdd size={20} />}
                >
                  {action.title}
                </Button>
              </Box>
            </>
          ) : (
            action
          )
        ) : null}
      </Stack>

      <Box>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant={'body2'} sx={{ color: 'common.white' }}>
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant={'body2'}
              target="_blank"
              sx={{ display: 'table', color: 'common.white' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
HeaderBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  action: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node
    }),
    PropTypes.node
  ]),
  icon: PropTypes.node,
  heading: PropTypes.string,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  sx: PropTypes.object,
  admin: PropTypes.bool,
  isUser: PropTypes.bool
};
