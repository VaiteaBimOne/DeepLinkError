import { RootState } from 'core/redux/store';
import { selectProfile } from 'core/users/state/profileSelectors';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import ErrorText from '../ErrorText';
import DatePickerModal from './DatePickerModal';

const Container = styled.View`
  flex: 1;
`;

interface RenderDatePickerInputProps extends Props {
  onPress: () => void;
}

export interface Props {
  error?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  value?: string;
  onChange?: (value?: string) => void;
  required?: boolean;
  children: (props: RenderDatePickerInputProps) => React.ReactNode;
  disabled?: boolean;
  useMinimumDate?: boolean;
  isDate?: boolean;
  preventClear?: boolean;
}

const DatePicker: React.FunctionComponent<Props> = (props) => {
  const { error, style, onChange, value, children, disabled, defaultValue } = props;

  const [savedDate, setSavedDate] = useState(value);
  const { dateFormat } = useSelector((state: RootState) => selectProfile(state));
  useEffect(() => {
    setSavedDate(value);
  }, [value]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (date?: string) => {
    const dateSelected = date ?? '';
    const dateSaved = date && moment(new Date(dateSelected)).format(dateFormat);
    onChange?.(dateSelected);
    setSavedDate(dateSaved || '');
    setShowDatePicker(false);
  };
  const onPress = () => setShowDatePicker(true);
  props = { ...props, isDate: true };
  return (
    <Container style={style}>
      {children({ ...props, onPress })}

      {!disabled && (
        <DatePickerModal
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          setSavedDate={setSavedDate}
          savedDate={savedDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          useMinimumDate={props.useMinimumDate}
          preventClear={props.preventClear}
        />
      )}

      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
    </Container>
  );
};

export default DatePicker;
