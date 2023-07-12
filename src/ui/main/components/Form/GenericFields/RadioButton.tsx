import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import Label from 'ui/main/components/Label';
import { Option } from '../GenericFormFields/FormPicker';

const Container = styled.View`
  flex: 1;
`;

const OptionsContainer = styled.View`
  padding-right: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const GroupLabel = styled(Label)`
  padding-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const OptionLabel = styled(Label)`
  flex-wrap: wrap;
  flex: 1;
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const RadioDot = styled.View<{ isSelected?: boolean }>`
  height: ${(props) => props.theme.metrics.spacing[3]}px;
  width: ${(props) => props.theme.metrics.spacing[3]}px;
  border-radius: ${(props) => props.theme.metrics.borderRadius[6]}px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.grey.light};
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.metrics.spacing[2]}px;

  ${(props) =>
    props.isSelected &&
    css`
      border-width: 7px;
      border-color: ${props.theme.colors.primary.primary};
    `}
`;

export interface Props {
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  selectedOption?: Option;
  onChange?: (value?: string | number | boolean) => void;
  options?: Option[];
  required?: boolean;
}

const RadioButton: React.FunctionComponent<Props> = ({ label, style, selectedOption, onChange, options, required }) => {
  const handleChange = (id?: string | number | boolean) => {
    onChange?.(id);
  };

  return (
    <Container style={style}>
      {!!label && (
        <GroupLabel variant={{ type: 'body' }}>
          {label}
          {required && <Text> *</Text>}
        </GroupLabel>
      )}

      <OptionsContainer>
        {options?.map((option) => (
          <OptionContainer key={option.value.toString()} onPress={() => handleChange(option.value)}>
            <RadioDot isSelected={selectedOption?.value === option.value} testID={option.testId} />
            <OptionLabel variant={{ type: 'attribute' }}>{option.label}</OptionLabel>
          </OptionContainer>
        ))}
      </OptionsContainer>
    </Container>
  );
};

export default RadioButton;
