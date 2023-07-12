import { useMemo } from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';

type ThemeFunction<T> = (theme: DefaultTheme) => T;
type UseStyle<T> = () => T & { theme: DefaultTheme };
type ITheme = DefaultTheme;

export type Style = Record<string, ViewStyle | TextStyle | ImageStyle>;

const useStyle = <T>(theming: ThemeFunction<T>): T & { theme: DefaultTheme } => {
  const theme = useTheme();

  const style = useMemo(() => StyleSheet.create(theming(theme)), [theme, theming]);
  return {
    ...style,
    theme,
  };
};

export const makeStyle =
  <T extends Style>(applyTheme: ThemeFunction<T>): UseStyle<T> =>
  () =>
    useStyle(applyTheme);

export type { ITheme as Theme };
