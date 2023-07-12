import DateRange from 'core/main/types/DateRange';
import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import ErrorText from '../ErrorText';
import DateRangePickerModal from './DateRangePickerModal';

const Container = styled.View`
  flex: 1;
`;

interface RenderDatePickerInputProps extends Props {
  onPress: () => void;
}

export interface Props {
  error?: string;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  value?: DateRange;
  onChange?: (value?: DateRange) => void;
  required?: boolean;
  children: (props: RenderDatePickerInputProps) => React.ReactNode;
  disabled?: boolean;
  useMinimumDate?: boolean;
}

const DateRangePicker: React.FunctionComponent<Props> = (props) => {
  const { error, style, onChange, value, children, disabled } = props;
  const [savedDate, setSavedDate] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (range?: DateRange) => {
    setShowDatePicker(false);

    if (!range?.end) {
      range = { end: range?.start, start: range?.start };
    }

    if (!range?.start) {
      range = { end: undefined, start: undefined };
    }

    setSavedDate(range);
    onChange?.(range);
  };

  const onPress = () => setShowDatePicker(true);

  return (
    <Container style={style}>
      {children({ ...props, onPress })}

      {!disabled && (
        <DateRangePickerModal
          value={value}
          onChange={handleChange}
          setSavedDate={setSavedDate}
          savedDate={savedDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          useMinimumDate={props.useMinimumDate}
        />
      )}

      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
    </Container>
  );
};

export default DateRangePicker;
