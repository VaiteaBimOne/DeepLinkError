import { Dimensions } from 'react-native';
import { normalize } from 'ui/main/utils/scalingUtils';

const metrics = {
  border: {
    large: '4px solid',
    medium: '2px solid',
    small: '1px solid',
    xlarge: '8px solid',
  },
  borderRadius: {
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
    6: 24,
  },
  hitSlop: {
    1: normalize(10),
    2: normalize(20),
    3: normalize(30),
  },
  iconSize: {
    1: normalize(8),
    2: normalize(16),
    3: normalize(24),
    4: normalize(32),
    5: normalize(48),
    6: normalize(64),
    7: normalize(96),
  },
  spacing: {
    0: normalize(4),
    1: normalize(8),
    2: normalize(16),
    3: normalize(24),
    4: normalize(32),
    5: normalize(48),
    6: normalize(64),
    7: normalize(96),
  },
  window: {
    ...Dimensions.get('window'),
  },
  zIndex: {
    firstFloor: 2,
    groundFloor: 1,
    roof: 10,
    secondFloor: 3,
  },
};

export default metrics;
