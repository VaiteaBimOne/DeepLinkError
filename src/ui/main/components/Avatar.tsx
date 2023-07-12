import React, { ReactNode } from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { ProfileFillSmall } from 'ui/main/assets/icons';
import Label from 'ui/main/components/Label';
import { normalize } from '../utils/scalingUtils';

export interface AvatarColors {
  background?: string;
  border?: string;
  text?: string;
}

export interface Props {
  uri?: string;
  size?: number;
  icon?: ReactNode;
  placeholderText?: string;
  placeholderColors?: AvatarColors;
  testId?: string;
}

const Avatar: React.FunctionComponent<Props> = ({ uri, size = normalize(24), placeholderText = '', placeholderColors = {}, testId, icon }) => {
  const theme = useTheme();

  const colors: AvatarColors = {
    background: placeholderColors.background ?? theme.colors.grey.semi,
    border: placeholderColors.border ?? theme.colors.white,
    text: placeholderColors.text ?? theme.colors.white,
  };

  function calculateSizePlaceholderLabel(size: number): number {
    return size - theme.metrics.spacing[1];
  }

  function calculateSizePlaceholderContainer(size: number): number {
    return placeholderText.length > 2 ? size + theme.metrics.spacing[1] : size;
  }

  if (!uri) {
    return (
      <PlaceholderContainer
        color={colors.background!}
        colorBorder={colors.border!}
        size={calculateSizePlaceholderContainer(size)}
        testID='placeholder'>
        {!!placeholderText && (
          <PlaceholderLabel variant={{ type: 'avatar' }} testID='placeholder-text' color={colors.text!} size={calculateSizePlaceholderLabel(size)}>
            {placeholderText}
          </PlaceholderLabel>
        )}
        {!!icon && <View testID='placeholder-icon'>{icon}</View>}
        {!placeholderText && !icon && (
          <View testID='placeholder-icon'>
            <ProfileFillSmall color={theme.colors.white} />
          </View>
        )}
      </PlaceholderContainer>
    );
  }

  return <StyledImage testID={'avatar' || testId} source={{ uri }} width={size} height={size} size={size} />;
};

export default Avatar;

const StyledImage = styled.Image<{ size: number }>`
  border-radius: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const PlaceholderContainer = styled.View<{ size: number; color: string; colorBorder: string }>`
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  justify-content: center;
  width: ${(props) => props.size}px;
  border-color: ${(props) => props.colorBorder ?? props.color};
  border-width: 1;
`;

const PlaceholderLabel = styled(Label)<{ size: number; color: string }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size / 2}px;
  line-height: ${(props) => props.size / 1.5}px;
`;
