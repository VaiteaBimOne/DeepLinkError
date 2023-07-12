import { NOT_SET_ID } from 'core/issues/services/IssuesFilters';
import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import ScrollOnFocusView from '../../ScrollOnFocusView';
import MultiPicker, { Props as MultiPickerProps } from '../GenericFields/MultiPicker/MultiPicker';
import { Option } from './FormPicker';

export interface Transformer {
  input: (value: any) => any;
  output: (value: any) => any;
}

export const defaultTransformer: Transformer = {
  input: (value: any) => value,
  output: (value: any) => value,
};

interface Props extends MultiPickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  mask?: (string | RegExp)[];
  includeNotSet?: boolean;
  required?: boolean;
  minLengthSearch?: number;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  options?: Option[];
  transform?: Transformer;
  parentRef?: React.RefObject<ScrollView>;
  resetField?: () => void;
  updateFormValues?: (attributeName: any, newValues?: (string | number | boolean)[]) => void;
  canAddOption?: boolean;
  searchSubtext?: string;
  handleAddCustom?: (option: Option) => void;
  handleRemoveCustom?: (optionLabel: string) => void;
}

const FormMultiPicker: React.FunctionComponent<Props> = ({
  defaultValue,
  control,
  name,
  required,
  pattern,
  error,
  mask,
  minLength,
  validate,
  placeholder,

  label,
  includeNotSet,
  options = [],
  parentRef,
  transform = defaultTransformer,
  resetField,
  canAddOption,
  searchSubtext,
  handleAddCustom,
  handleRemoveCustom,
  ...props
}) => {
  const { t } = useTranslation('issues');
  const optionsWithNotSet = includeNotSet ? [{ label: t('attributes.notSet'), value: NOT_SET_ID }, ...options] : options;

  return (
    <Controller
      control={control}
      render={({ field }) => {
        const selectedOptions = optionsWithNotSet.filter((option) => {
          if (field.value != null) {
            return transform.input(field.value || [NOT_SET_ID])?.includes(option.value);
          }
        });

        return (
          <ScrollOnFocusView ref={field.ref} parentRef={parentRef}>
            <MultiPicker
              includeNotSet={includeNotSet}
              selectedOptions={selectedOptions}
              options={optionsWithNotSet}
              onChange={(e) => {
                const output = transform.output(e || []);
                return field.onChange(output);
              }}
              placeholder={placeholder}
              error={error}
              mask={mask}
              label={label}
              required={required}
              resetField={resetField}
              canAddOption={canAddOption}
              searchSubtext={searchSubtext}
              handleAddCustom={handleAddCustom}
              handleRemoveCustom={handleRemoveCustom}
              name={name}
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
};

export default FormMultiPicker;
