import React, { useState } from 'react';
import styled from 'styled-components/native';
import ErrorText from '../ErrorText';
import { Props as TextInputProps } from '../TextInput/TextInput';
import TextPickerModal from './TextPickerModal';

const Container = styled.View`
  flex: 1;
`;

interface RenderInputProps {
  onPress: () => void;
  placeholder?: string;
  value?: string;
  label?: string;
  required?: boolean;
}

export interface Props extends TextInputProps {
  onChange?: (value?: string) => void;
  children: (props: RenderInputProps) => React.ReactNode;
}

const TextPicker: React.FunctionComponent<Props> = (props) => {
  const { error, style, children, disabled } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container style={style}>
      {children({ onPress: () => setModalVisible(true), ...props })}
      {!disabled && <TextPickerModal isVisible={modalVisible} setIsVisible={setModalVisible} {...props} />}

      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
    </Container>
  );
};

export default TextPicker;
