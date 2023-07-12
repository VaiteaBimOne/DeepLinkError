import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import Label from 'ui/main/components/Label';
import ErrorText from '../ErrorText';
import TextInputMaxCharacters from '../Errors/TextInputMaxCharacters';

export interface Props {
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  value?: string;
  squareTopBorders?: boolean;
  required?: boolean;
  maxLength?: number;
}

const GeneralTextInput: React.FunctionComponent<Props> = ({
  error,
  rightIcon,
  leftIcon,
  label,
  squareTopBorders,
  style,
  value,
  required,
  maxLength,
  children,
}) => {
  return (
    <Container style={style}>
      {!!label && (
        <InputLabel variant={{ type: 'body' }}>
          {label}
          {required && <Text> *</Text>}
        </InputLabel>
      )}

      <InputContainer squareTopBorders={squareTopBorders}>
        {leftIcon}
        {children}
        {rightIcon}
      </InputContainer>

      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
      <TextInputMaxCharacters value={value} maxLength={maxLength} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const InputContainer = styled.View<{ squareTopBorders?: boolean }>`
  background-color: #fff;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.grey.light};
  flex-direction: row;
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;

  ${(props) =>
    props.squareTopBorders &&
    css`
      border-top-right-radius: ${props.theme.metrics.borderRadius[1]}px;
      border-top-left-radius: ${props.theme.metrics.borderRadius[1]}px;
    `}
`;

const InputLabel = styled(Label)`
  padding-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export default GeneralTextInput;
