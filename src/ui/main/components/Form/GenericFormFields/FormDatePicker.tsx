import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import { ScrollView } from 'react-native';
import ScrollOnFocusView from '../../ScrollOnFocusView';
import DatePicker, { Props as DatePickerProps } from '../GenericFields/DatePicker/DatePicker';

interface Props extends DatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  defaultValue?: string;
  name: string;
  error?: string;
  required?: boolean;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  placeholder?: string;
  label?: string;
  parentRef?: React.RefObject<ScrollView>;
  preventClear?: boolean;
}

const FormDatePicker: React.FunctionComponent<Props> = ({
  control,
  defaultValue,
  name,
  required,
  pattern,
  error,
  minLength,
  validate,
  placeholder,
  label,
  parentRef,
  preventClear,
  ...props
}) => (
  <Controller
    control={control}
    render={({ field }) => (
      <ScrollOnFocusView ref={field.ref} parentRef={parentRef}>
        <DatePicker
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          error={error}
          label={label}
          required={required}
          defaultValue={defaultValue}
          preventClear={preventClear}
          {...props}
        />
      </ScrollOnFocusView>
    )}
    name={name}
    rules={{ minLength, pattern, required, validate }}
    defaultValue={defaultValue}
  />
);

export default FormDatePicker;
