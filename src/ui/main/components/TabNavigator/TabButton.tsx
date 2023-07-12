import React, { MouseEvent } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

const CircleButton = styled.View<{ disabled?: boolean }>`
  width: ${(props) => props.theme.metrics.iconSize[5]}px;
  height: ${(props) => props.theme.metrics.iconSize[5]}px;
  border-radius: ${(props) => props.theme.metrics.iconSize[5] / 2}px;
  background-color: ${(props) => (props.disabled ? props.theme.colors.grey.light : props.theme.colors.primary.primary)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  onPress?: (e: MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const TabButton: React.FunctionComponent<Props> = ({ onPress, children, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <CircleButton disabled={disabled}>{children}</CircleButton>
  </TouchableOpacity>
);

export default TabButton;
