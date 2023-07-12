import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import { ScrollView } from 'react-native';
import ScrollOnFocusView from '../../ScrollOnFocusView';
import TextPicker, { Props as TextFieldProps } from '../GenericFields/TextPicker/TextPicker';

interface Transformer {
  input: (value: any) => any;
  output: (e: any) => any;
}

const defaultTransformer = {
  input: (value: any) => value,
  output: (value: any) => value,
};

interface Props extends TextFieldProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  required?: boolean;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  transform?: Transformer;
  parentRef?: React.RefObject<ScrollView>;
  showUnsyncIndicator?: boolean;
}

const FormTextPicker: React.FunctionComponent<Props> = ({
  defaultValue,
  control,
  name,
  required,
  pattern,
  error,
  placeholder,
  minLength,
  maxLength,
  validate,
  label,
  parentRef,
  transform = defaultTransformer,
  ...props
}) => (
  <Controller
    control={control}
    render={({ field }) => {
      const handleOnChange = (e: string | undefined) => {
        return field.onChange(e == undefined ? null : transform.output(e));
      };

      return (
        <ScrollOnFocusView ref={field.ref} parentRef={parentRef}>
          <TextPicker
            autoCorrect={false}
            value={transform.input(field.value)}
            onChange={(e) => handleOnChange(e)}
            placeholder={placeholder}
            error={error}
            label={label}
            required={required}
            maxLength={maxLength}
            {...props}
          />
        </ScrollOnFocusView>
      );
    }}
    name={name}
    rules={{ minLength, pattern, required, validate }}
    defaultValue={defaultValue}
  />
);
export default FormTextPicker;
