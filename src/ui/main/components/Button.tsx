import React, { ReactElement } from 'react';
import { Insets, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled, { css, useTheme } from 'styled-components/native';
import theme from '../theme';
import { normalize } from '../utils/scalingUtils';
import Avatar from './Avatar';
import Label from './Label';

export type ButtonVariant = 'default' | 'primary' | 'subtle' | 'destructive' | 'subtleDestructive' | 'subtleDefault' | 'outlined';

type ButtonSize = 'default' | 'small';

interface StyleProps {
  size: ButtonSize;
  variant: ButtonVariant;
}

export interface Props {
  label?: string | ReactElement;
  description?: string;
  avatarUrl?: string;
  initials?: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
  Icon?: React.FC<SvgProps>;
  iconSize?: number;
  iconColor?: string;
  centerIcon?: boolean;
  disabled?: boolean;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  hitSlop?: Insets;
}

const Button: React.FunctionComponent<Props> = ({
  onPress,
  style,
  label,
  description,
  avatarUrl,
  initials,
  variant = 'primary',
  size = 'default',
  testID,
  Icon,
  iconSize = theme.metrics.iconSize[2],
  iconColor,
  centerIcon = false,
  labelStyle,
  disabled,
  numberOfLines,
  adjustsFontSizeToFit,
  hitSlop,
}) => {
  const { colors, metrics } = useTheme();
  return (
    <StyledButton
      hitSlop={
        hitSlop || {
          bottom: metrics.hitSlop[1],
          left: metrics.hitSlop[1],
          right: metrics.hitSlop[1],
          top: metrics.hitSlop[1],
        }
      }
      disabled={disabled}
      style={style}
      onPress={onPress}
      variant={variant}
      size={size}
      testID={testID}>
      {Icon && (
        <IconWrapper centerIcon={centerIcon} testID='button-icon' hasDescription={!!description}>
          <Icon color={iconColor || colors.button[variant].color} height={iconSize} width={iconSize} />
        </IconWrapper>
      )}

      {(!!avatarUrl || !!initials || (description && label && description === label)) && (
        <AvatarWrapper testID='avatar-wrapper'>
          <Avatar uri={avatarUrl} placeholderText={initials} size={normalize(32)} />
        </AvatarWrapper>
      )}

      {!!label && (
        <StyledLabel
          buttonVariant={variant}
          variant={{ type: 'body' }}
          style={labelStyle}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          hasAvatar={!!avatarUrl || !!initials || description === label}>
          {label}
        </StyledLabel>
      )}
      {!!description && (
        <StyledDescription
          buttonVariant={variant}
          variant={{ type: 'body' }}
          style={labelStyle}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          hasAvatar={!!avatarUrl || !!initials || description === label}>
          {description}
        </StyledDescription>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity<StyleProps>`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}

  ${({ theme: { colors, metrics }, variant }) => `
    background-color: ${colors.button[variant].background};
    border-radius: ${metrics.borderRadius[3]}px;
    padding: ${metrics.spacing[2]}px;
  `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      border: ${props.theme.metrics.border.small};
      border-color: ${props.theme.colors.button.outlined.borderColor};
    `}

  ${({ theme: { metrics }, size }) =>
    size === 'small' &&
    css`
      padding: ${metrics.spacing[1]}px;
    `}
`;

const StyledLabel = styled(Label)<{ buttonVariant: ButtonVariant; hasAvatar: boolean }>`
  color: ${(props) => props.theme.colors.button[props.buttonVariant].color};
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.hasAvatar &&
    css`
      margin-left: ${normalize(40)};
    `}
`;

const StyledDescription = styled(Label)<{ buttonVariant: ButtonVariant; hasAvatar: boolean }>`
  color: ${(props) => props.theme.colors.grey.medium};
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.hasAvatar &&
    css`
      margin-left: ${normalize(40)};
    `}
`;

const IconWrapper = styled.View<{ centerIcon: boolean; hasDescription: boolean }>`
  margin-right: ${(props) => (props.centerIcon ? 0 : props.theme.metrics.spacing[1])}px;
  justify-content: center;
  ${(props) =>
    props.hasDescription &&
    css`
      position: absolute;
      right: ${props.theme.metrics.spacing[2]};
    `}
`;

const AvatarWrapper = styled.View`
  position: absolute;
  left: ${(props) => props.theme.metrics.spacing[2]}px;
`;

export default React.memo(Button);
