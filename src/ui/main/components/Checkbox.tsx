import React from 'react';
import { ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from 'styled-components/native';
import Label from './Label';

export interface CheckboxProps {
  onPress: () => void;
  isChecked?: boolean;
  text?: string;
  iconStyle?: StyleProp<ViewStyle>;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ onPress, isChecked, text, iconStyle }) => {
  const { colors, metrics } = useTheme();

  return (
    <BouncyCheckbox
      text={text}
      hitSlop={{ bottom: metrics.hitSlop[3], left: metrics.hitSlop[3], right: metrics.hitSlop[3], top: metrics.hitSlop[3] }}
      iconStyle={[
        {
          borderColor: isChecked ? colors.primary.primary : colors.grey.medium,
          borderRadius: 2,
          height: metrics.iconSize[3],
          width: metrics.iconSize[3],
        },
        iconStyle,
      ]}
      textComponent={<Label variant={{ type: 'attribute' }}>{text}</Label>}
      disableBuiltInState
      fillColor={colors.primary.primary}
      isChecked={isChecked}
      onPress={onPress}
    />
  );
};

export default Checkbox;
