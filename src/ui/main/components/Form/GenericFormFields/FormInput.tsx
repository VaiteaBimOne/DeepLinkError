import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import { ScrollView } from 'react-native';
import ScrollOnFocusView from '../../ScrollOnFocusView';
import TextInput, { Props as TextInputProps } from '../GenericFields/TextInput/TextInput';

interface Transformer {
  input: (value: any) => any;
  output: (e: any) => any;
}

const defaultTransformer = {
  input: (value: any) => value,
  output: (value: any) => value,
};

interface Props extends TextInputProps {
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
  onFocus?: any;
  transform?: Transformer;
  parentRef?: React.RefObject<ScrollView>;
}

const FormInput: React.FunctionComponent<Props> = ({
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
  transform = defaultTransformer,
  parentRef,
  ...props
}) => (
  <Controller
    control={control}
    render={({ field }) => {
      return (
        <ScrollOnFocusView ref={field.ref} parentRef={parentRef}>
          <TextInput
            autoCorrect={false}
            value={transform.input(field.value)}
            onChange={(e) => {
              return field.onChange(transform.output(e));
            }}
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

export default FormInput;
