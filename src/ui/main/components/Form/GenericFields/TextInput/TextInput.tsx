import React, { useEffect, useState } from 'react';
import {
  KeyboardType,
  NativeSyntheticEvent,
  Platform,
  ReturnKeyType,
  StyleProp,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';
import { LabelVariant } from 'ui/main/components/Label';
import { normalize } from 'ui/main/utils/scalingUtils';
import GeneralTextInput from './GeneralTextInput';

type AutoCompleteType =
  | 'name'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'password'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  | 'off';

interface NativePropsSelection {
  nativeEvent: {
    selection: { start: number; end: number };
  };
}

export interface Props {
  disabled?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  keyboardType?: KeyboardType;
  label?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  placeholder?: string;
  returnKeyType?: ReturnKeyType;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  value?: string;
  variant?: LabelVariant;
  squareTopBorders?: boolean;
  multiline?: boolean;
  autoCorrect?: boolean;
  autoCompleteType?: AutoCompleteType;
  required?: boolean;
  maxLength?: number;
}

const TextInput: React.FunctionComponent<Props> = ({
  disabled,
  error,
  rightIcon,
  leftIcon,
  keyboardType,
  label,
  squareTopBorders,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  placeholder,
  returnKeyType,
  style,
  testId,
  value,
  multiline,
  autoCorrect,
  autoCompleteType,
  required,
  maxLength,
}) => {
  const theme = useTheme();

  const [internalValue, setInternalValue] = useState(value);
  const [internalSelection, setInternalSelection] = useState<{ end: number; start: number } | undefined>(undefined);

  useEffect(() => {
    if (value != null && !internalSelection) {
      setInternalSelection({ end: value.length, start: value.length });
    }
    setInternalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const changeIsNotEmpty = (change: string) => {
    return change !== ' ' && (internalValue !== ' ' || internalValue !== undefined);
  };

  const handleChange = (change: string) => {
    if (changeIsNotEmpty(change)) {
      setInternalValue(change);
      onChange?.(change);
    }
  };

  const androidCursorSelection = Platform.OS === 'android' && {
    onSelectionChange: ({
      nativeEvent: {
        selection: { start, end },
      },
    }: NativePropsSelection) => {
      setInternalSelection({ end, start });
    },
    selection: internalSelection,
  };

  return (
    <GeneralTextInput
      style={style}
      error={error}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      label={label}
      squareTopBorders={squareTopBorders}
      required={required}>
      <StyledTextInput<React.ElementType>
        multiline={multiline}
        numberOfLines={multiline ? 5 : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={!disabled}
        placeholderTextColor={theme.colors.grey.medium}
        placeholder={placeholder}
        value={internalValue?.trimStart()}
        onChangeText={handleChange}
        {...androidCursorSelection}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmit}
        testID={testId}
        autoCorrect={autoCorrect}
        autoCompleteType={autoCompleteType}
        maxLength={maxLength}
      />
    </GeneralTextInput>
  );
};

const StyledTextInput = styled.TextInput<{ isMultiline?: boolean }>`
  ${(props) => props.theme.fonts.text.body.center};
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  flex: 1;

  ${(props) =>
    props.multiline &&
    css`
      text-align-vertical: top;
      height: ${normalize(120)}px;
    `}
`;

export default TextInput;
