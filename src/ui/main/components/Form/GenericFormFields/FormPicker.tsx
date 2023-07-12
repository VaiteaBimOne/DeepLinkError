import { NOT_SET_ID } from 'core/issues/services/IssuesFilters';
import React from 'react';
import { Control, Controller, Validate, ValidationRule } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import ScrollOnFocusView from '../../ScrollOnFocusView';
import Picker, { Props as PickerProps } from '../GenericFields/Picker/Picker';

export type Option = {
  value: any;
  label: string;
  description?: string;
  avatarUrl?: string;
  initials?: string;
  testId?: string;
  color?: string;
  new?: boolean;
  showAvatar?: boolean;
};

interface Props extends PickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  validate?: Validate<string> | Record<string, Validate<string>>;
  pattern?: ValidationRule<RegExp>;
  minLength?: number;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  options?: Option[];
  parentRef?: React.RefObject<ScrollView>;
  resetField?: () => void;
  includeNotSet?: boolean;
  showUnsyncIndicator?: boolean;
  isLoading?: boolean;
  mask?: (string | RegExp)[];
  canAddOption?: boolean;
  searchSubtext?: string;
  handleAddCustom?: (option: Option) => void;
}

const FormPicker: React.FunctionComponent<Props> = ({
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
  options = [],
  parentRef,
  resetField,
  includeNotSet,
  isLoading,
  mask,
  canAddOption,
  searchSubtext,
  handleAddCustom,
  ...props
}) => {
  const { t } = useTranslation('issues');
  return (
    <Controller
      control={control}
      render={({ field }) => {
        const optionsWithNotSet = includeNotSet ? [{ label: t('attributes.notSet'), value: NOT_SET_ID }, ...options] : options;
        const selectedOption = optionsWithNotSet.find((option) => option.value === (field.value === undefined ? NOT_SET_ID : field.value));

        const handleOnChange = (value: string | number | boolean | undefined) => {
          field.onChange(value === NOT_SET_ID || value === undefined ? null : value);
        };

        return (
          <ScrollOnFocusView ref={field.ref} parentRef={parentRef}>
            <Picker
              selectedOption={selectedOption}
              options={optionsWithNotSet}
              onChange={(value) => handleOnChange(value)}
              resetField={resetField}
              placeholder={placeholder}
              error={error}
              label={label}
              required={required}
              isLoading={isLoading}
              mask={mask}
              canAddOption={canAddOption}
              searchSubtext={searchSubtext}
              handleAddCustom={handleAddCustom}
              name={name}
              minLength={minLength}
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

export default FormPicker;
