import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import DateRangePicker, { Props as DateRangePickerProps } from '../GenericFields/DateRangePicker/DateRangePicker';

interface Props extends DateRangePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  required?: boolean;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
}

const FormDateRangePicker: React.FunctionComponent<Props> = ({
  defaultValue,
  control,
  name,
  required,
  pattern,
  error,
  minLength,
  validate,
  placeholder,
  label,
  ...props
}) => {
  return (
    <Controller
      control={control}
      render={({ field }) => {
        return (
          <DateRangePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            error={error}
            label={label}
            required={required}
            {...props}
          />
        );
      }}
      name={name}
      rules={{ minLength, pattern, required, validate }}
      defaultValue={defaultValue}
    />
  );
};

export default FormDateRangePicker;
