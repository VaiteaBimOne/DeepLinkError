import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import Label from './Label';

export interface Props {
  label: string;
  Icon?: React.FC<SvgProps>;
  onPress: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const ButtonOpacity = ({ label, Icon, onPress, wrapperStyle }: Props) => {
  const theme = useTheme();

  return (
    <Wrapper style={wrapperStyle} testID='buttonOpacityWrapper'>
      <Touchable onPress={onPress}>
        {Icon && (
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} testID='buttonOpacityIcon'>
            <Icon color={theme.colors.grey.lightest} style={{ marginRight: theme.metrics.spacing[0] }} />
          </View>
        )}
        <Label variant={{ type: 'buttonOpacityLabel' }} testID='buttonOpacityLabel'>
          {label}
        </Label>
      </Touchable>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  position: absolute;
  left: ${(props) => props.theme.metrics.spacing[1]}px;
  bottom: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const Touchable = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid ${(props) => props.theme.colors.grey.lightest};
  border-radius: ${(props) => props.theme.metrics.spacing[0]}px;
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  padding-vertical: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export default ButtonOpacity;
