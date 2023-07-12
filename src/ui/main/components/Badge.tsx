import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

interface BadgeColors {
  background?: string;
  text?: string;
}

interface Props {
  text: string | number;
  colors?: BadgeColors;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<Props> = ({ text, colors, icon, style, labelStyle }) => {
  const theme = useTheme();

  const defaultColors: BadgeColors = {
    background: theme.colors.grey.lighter,
    text: theme.colors.black,
  };

  const badgeColor = { ...defaultColors, ...colors };

  return (
    <Container backgroundColor={badgeColor.background} textColor={badgeColor.text} style={style}>
      <Content testID='badge'>
        {icon && <IconWrapper testID='badge-icon'>{icon}</IconWrapper>}
        <Label
          numberOfLines={1}
          testID='badge-content'
          style={[{ color: badgeColor.text, fontSize: normalize(12), lineHeight: normalize(17) }, labelStyle]}
          variant={{ type: 'badge' }}>
          {text}
        </Label>
      </Content>
    </Container>
  );
};

export default Badge;

const Container = styled.View<{ backgroundColor?: string; textColor?: string }>`
  border-radius: ${normalize(50)}px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
`;

const IconWrapper = styled.View`
  margin-right: ${(props) => props.theme.metrics.spacing[0]}px;
  justify-content: center;
`;

const Content = styled.View`
  min-width: ${normalize(10)}px;
  height: ${normalize(18)}px;
  justify-content: center;
  flex-direction: row;
  align-self: flex-start;
  align-content: center;
  padding: 0px;
  margin-right: ${(props) => props.theme.metrics.spacing[0]}px;
  margin-left: ${(props) => props.theme.metrics.spacing[0]}px;
`;
