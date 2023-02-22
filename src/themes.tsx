import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createTheming } from '@callstack/react-theme-provider';

export enum ThemesEnum {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export const breakpoints = {
  xs: 360,
  sm: 768,
  smd: 1024,
  md: 1280,
  lg: 1440,
};

export const media = {
  xs: `@media screen and (max-width: ${breakpoints.xs}px)`,
  sm: `@media screen and (max-width: ${breakpoints.sm}px)`,
  smd: `@media screen and (max-width: ${breakpoints.smd}px)`,
  md: `@media screen and (max-width: ${breakpoints.md}px)`,
  lg: `@media screen and (max-width: ${breakpoints.lg}px)`,
  mqDark: '@media (prefers-color-scheme: dark)',
};

export const tmSelectors = {
  dark: 'body.DARK &',
};

export const lightPalette = {
  pageBackground:
    'linear-gradient(179.59deg, #EDEDF0 3.37%, #EDEEF1 11.26%, #F3FBFE 18.4%, #FEFCFA 30.72%, #FFFFFF 59.29%, #FFFFFF 100.12%)',
  transparent: 'transparent',
  bg100: '#F7F7FA',
  font50: '#888890',
  font100: '#1B182D',
  themeIndicator: '#888890',
  themeBg: '#20232A',
  hamburger: '#404146',
  mobileMenuBackground:
    'linear-gradient(179.76deg, #edeef1 4.01%,    #f3fbfe 45.82%,    #fefcfa 112.58% )',
  menuItemActive:
    'linear-gradient(90deg, #CACAD2 1.5%, rgba(202, 202, 210, 0) 91.74%)',
};

export const darkPalette = {
  pageBackground:
    'linear-gradient(180deg, #191B22 0.21%, #23262E 22.86%, #191B22 39.11%, #1C1E26 100.14%)',
  transparent: 'transparent',
  bg100: '#13141A',
  font50: '#888890',
  font100: '#EDEDF0',
  themeIndicator: '#EDEDF0',
  themeBg: '#DCDCE1',
  hamburger: '#EDEDF0',
  mobileMenuBackground:
    'linear-gradient(180deg, #191B22 6.7%, #23262E 37.01%, #191B22 63.98%, #1C1E26 100.14%)',
  menuItemActive:
    ' linear-gradient(90deg, #696B73 1.35%, rgba(64, 65, 70, 0) 100.18%)',
} as Palette;

type Palette = typeof lightPalette;

export const appTheme = {
  light: {
    colors: lightPalette,
  },
  dark: {
    colors: darkPalette,
  },
  media,
  breakpoints,
  tmSelectors,
};

const themesArray = Object.values(ThemesEnum);

export const getNextTheme = (currentTheme: ThemesEnum): ThemesEnum => {
  const currentThemeIndex = themesArray.indexOf(currentTheme);
  const nextThemeIndex =
    currentThemeIndex === themesArray.length - 1 ? 0 : currentThemeIndex + 1;
  const nextTheme = themesArray[nextThemeIndex];
  return nextTheme;
};

export const theming = createTheming(appTheme);

interface IThemeContext {
  theme: ThemesEnum;
  changeTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: ThemesEnum.LIGHT,
  changeTheme: () => {},
});

export const ThemeProvider = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  const [theme, setTheme] = useState<ThemesEnum>(ThemesEnum.LIGHT);

  const changeTheme = useCallback(() => {
    const body = document.querySelector('body') as Element;
    const newTheme = ThemesEnum[getNextTheme(theme)];
    body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }, [theme, setTheme]);

  const initialContext = useMemo(
    () => ({ theme, changeTheme }),
    [theme, changeTheme]
  );

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as ThemesEnum) || ThemesEnum.LIGHT;
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={initialContext}>
      {/* @ts-ignore */}
      <theming.ThemeProvider theme={appTheme}>{children}</theming.ThemeProvider>
    </ThemeContext.Provider>
  );
};
