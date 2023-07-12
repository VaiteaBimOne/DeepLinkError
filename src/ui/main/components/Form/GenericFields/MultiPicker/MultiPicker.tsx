import { Identifier } from 'core/main/types/Identifier';
import { GenericRfiSubmittalCustomAttributesTypes } from 'core/rfiSubmittal/rfis/domain/RfisAttributesTypes';
import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Option } from '../../GenericFormFields/FormPicker';
import ErrorText from '../ErrorText';
import PickerModal from '../Picker/PickerModal';

const Container = styled.View`
  flex: 1;
`;

interface RenderMultiPickerInputProps extends Props {
  onPress: () => void;
  values?: string[];
  ids?: Identifier[];
}

export interface Props {
  error?: string;
  label?: string;
  placeholder?: string;
  includeNotSet?: boolean;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  selectedOptions?: Option[];
  onChange?: (value?: (string | number | boolean)[]) => void;
  options?: Option[];
  required?: boolean;
  children: (props: RenderMultiPickerInputProps) => React.ReactNode;
  disabled?: boolean;
  mask?: (string | RegExp)[];
  resetField?: () => void;
  canAddOption?: boolean;
  searchSubtext?: string;
  handleAddCustom?: (option: Option) => void;
  handleRemoveCustom?: (optionLabel: string) => void;
  name: string;
}

const MultiPicker: React.FunctionComponent<Props> = (props) => {
  const { error, label, style, selectedOptions, onChange, options, children, disabled, mask, resetField } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const addCustomOption = (value: GenericRfiSubmittalCustomAttributesTypes) => {
    const newCustomOption: Option = { label: value.customName!, value: value.id };

    selectedOptions?.push(newCustomOption);
    props.handleAddCustom && props.handleAddCustom(newCustomOption);
  };

  const handleChange = (value?: string | number | boolean | GenericRfiSubmittalCustomAttributesTypes, label?: string) => {
    if (value) {
      if (value instanceof Object && 'customName' in value) {
        addCustomOption(value);
      }

      const selectedValues = selectedOptions?.map((x) => x.value) || [];
      const shouldRemove = selectedValues.includes(value);

      onChange?.(shouldRemove ? selectedValues.filter((x) => x !== value) : [...selectedValues, value]);
    } else if (!value && label) {
      props.handleRemoveCustom && props.handleRemoveCustom(label);
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <Container style={style}>
      {children({
        ...props,
        ids: selectedOptions?.map((x) => x.value),
        onPress: () => setModalVisible(true),
        values: selectedOptions?.map((x) => x.label),
      })}
      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}

      {!disabled && (
        <PickerModal
          value={selectedOptions?.map((x) => x.value)}
          resetField={resetField}
          onChange={handleChange}
          options={options}
          isVisible={modalVisible}
          mask={mask}
          setIsVisible={setModalVisible}
          label={label}
          canAddOption={props.canAddOption}
          searchSubtext={props.searchSubtext}
          multi
          required={props.required}
          name={props.name}
        />
      )}
    </Container>
  );
};

export default MultiPicker;
