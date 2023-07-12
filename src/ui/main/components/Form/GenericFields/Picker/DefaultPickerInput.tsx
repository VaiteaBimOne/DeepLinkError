import React from 'react';
import { Text } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { CaretRight } from 'ui/main/assets/icons';
import Label from 'ui/main/components/Label';
import { normalize } from 'ui/main/utils/scalingUtils';

const StyledTextInput = styled.TextInput`
  ${(props) => props.theme.fonts.text.body.center};
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  flex: 1;
`;

const InputContainer = styled.TouchableOpacity`
  align-items: center;
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.grey.light};
  flex-direction: row;
  padding-right: ${(props) => props.theme.metrics.spacing[2]}px;
  background-color: ${(props) => props.theme.colors.white};
`;

const InputLabel = styled(Label)`
  padding-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
`;

interface Props {
  label?: string;
  onPress?: () => void;
  required?: boolean;
  placeholder?: string;
  value?: string;
  testId?: string;
}

const DefaultPickerInput: React.FC<Props> = ({ label, onPress, required, placeholder, value, testId }) => {
  const theme = useTheme();

  return (
    <>
      {!!label && (
        <InputLabel variant={{ type: 'body' }}>
          {label}
          {required && <Text> *</Text>}
        </InputLabel>
      )}

      <InputContainer onPress={onPress} testID='picker-input'>
        <StyledTextInput
          pointerEvents='none'
          editable={false}
          placeholderTextColor={theme.colors.grey.medium}
          placeholder={placeholder}
          value={value}
          testID={testId}
        />
        <CaretRight width={normalize(20)} height={normalize(20)} color={theme.colors.black} />
      </InputContainer>
    </>
  );
};

export default DefaultPickerInput;
