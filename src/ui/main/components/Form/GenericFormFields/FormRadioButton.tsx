import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import RadioButton, { Props as RadioButtonProps } from '../GenericFields/RadioButton';
import { Option } from './FormPicker';

interface Props extends RadioButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  required?: boolean;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  label?: string;
  options?: Option[];
}

const FormRadioButton: React.FunctionComponent<Props> = ({
  defaultValue,
  control,
  name,
  required,
  pattern,
  minLength,
  validate,
  label,
  options = [],
  ...props
}) => (
  <Controller
    control={control}
    render={({ field }) => {
      const selectedOption = options.find((option) => option.value === field.value);

      return <RadioButton selectedOption={selectedOption} options={options} onChange={field.onChange} label={label} required={required} {...props} />;
    }}
    name={name}
    rules={{ minLength, pattern, required, validate }}
    defaultValue={defaultValue}
    {...props}
  />
);

export default FormRadioButton;
