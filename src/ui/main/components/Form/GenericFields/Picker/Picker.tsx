import { Identifier } from 'core/main/types/Identifier';
import { GenericRfiSubmittalCustomAttributesTypes } from 'core/rfiSubmittal/rfis/domain/RfisAttributesTypes';
import React, { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Option } from '../../GenericFormFields/FormPicker';
import ErrorText from '../ErrorText';
import PickerModal from './PickerModal';

interface RenderPickerInputProps extends Props {
  onPress: () => void;
  value?: string;
  id?: Identifier;
}

export interface Props {
  error?: string;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  selectedOption?: Option;
  onChange?: (value?: string | number | boolean) => void;
  options?: Option[];
  required?: boolean;
  children: (props: RenderPickerInputProps) => React.ReactNode;
  disabled?: boolean;
  resetField?: () => void;
  isLoading?: boolean;
  mask?: (string | RegExp)[];
  canAddOption?: boolean;
  searchSubtext?: string;
  handleAddCustom?: (option: Option) => void;
  name: string;
  minLength?: number;
}

const Picker: React.FunctionComponent<Props> = (props) => {
  const { error, label, style, selectedOption, onChange, options, children, disabled, resetField, required, minLength } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const addCustomOption = (value: GenericRfiSubmittalCustomAttributesTypes) => {
    const newCustomOption: Option = { label: value.customName!, value: value.id };

    props.handleAddCustom && props.handleAddCustom(newCustomOption);
  };

  const handleChange = (value?: string | number | boolean | GenericRfiSubmittalCustomAttributesTypes) => {
    if (value instanceof Object && 'customName' in value) {
      addCustomOption(value);
      onChange?.(0);
      toggleModal();
      return;
    }

    onChange?.(value as string | number | boolean);
    toggleModal();
  };

  const value = selectedOption?.label;
  const selectedId = selectedOption?.value;

  return (
    <View style={style}>
      {children({ ...props, id: selectedId, onPress: toggleModal, value })}
      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
      {!disabled && (
        <PickerModal
          required={required || false}
          testId={props.testId}
          value={selectedOption?.value}
          onChange={handleChange}
          options={options}
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          label={label}
          resetField={resetField}
          isLoading={props.isLoading}
          mask={props.mask}
          canAddOption={props.canAddOption}
          searchSubtext={props.searchSubtext}
          name={props.name}
          minLength={minLength}
        />
      )}
    </View>
  );
};

export default Picker;
