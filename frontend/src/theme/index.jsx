'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useSelector } from 'src/redux';

// mui
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// stylis
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// custom theme
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import shadows, { customShadows } from './shadows';
import componentsOverride from './overrides';

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired
};

const Localization = (lang) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'fr':
      return 'frFR';
    case 'en':
      return 'enUS';
    default:
      return 'frFR';
  }
};

export default function ThemeRegistry({ children }) {
  const { themeMode } = useSelector((state) => state.settings);
  const pathName = usePathname();
  const segments = pathName?.split('/');
  const lang = segments[1];
  const locale = Localization(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const styleCache = createCache({
    key: dir === 'rtl' ? 'muirtl' : 'css',
    stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : []
  });
  const customTheme = () =>
    createTheme(
      {
        palette: themeMode === 'dark' ? { ...palette.dark, mode: 'dark' } : { ...palette.light, mode: 'light' },
        direction: dir,
        typography: typography,
        shadows: themeMode === 'dark' ? shadows.dark : shadows.light,
        shape,
        breakpoints,
        customShadows: themeMode === 'dark' ? customShadows.light : customShadows.dark
      },
      locales[locale]
    );

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={{ ...customTheme(), components: componentsOverride(customTheme()) }}>
        <main dir={dir}>
          <CssBaseline />
          {children}
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}
