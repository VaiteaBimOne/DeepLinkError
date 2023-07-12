import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import mediaQueries from 'ui/main/theme/mediaQueries';

export const normalize = (size: number, factor?: number): number => {
  const { width } = Dimensions.get('window');

  return width >= mediaQueries.tablet ? moderateScale(size, factor) : size;
};

export const isTablet = (): boolean => {
  const { width } = Dimensions.get('window');

  return width >= mediaQueries.tablet;
};
