import { omit } from 'lodash';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import styled, { css, useTheme } from 'styled-components/native';
import DrawerHandle from 'ui/main/components/drawer/DrawerHandle';
import TextInputMaxCharacters from '../Errors/TextInputMaxCharacters';
import { Props as TextInputProps } from '../TextInput/TextInput';
import TextPickerModalHeader from './TextPickerModalHeader';

interface Props extends TextInputProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onChange?: (value?: string) => void;
  required?: boolean;
}

interface NativePropsSelection {
  nativeEvent: {
    selection: { start: number; end: number };
  };
}

export interface InputRef {
  focus: () => void;
}

const TextPickerModal: React.FC<Props> = (props) => {
  const restProps = omit(props, 'children');
  const theme = useTheme();
  const inputRef = React.useRef<TextInput>(null);
  const { isVisible, setIsVisible, label, onChange, onSubmit, disabled } = props;
  const value = props.value?.split('<b>').join('').split('</b>').join('');
  const [internalSelection, setInternalSelection] = useState<{ end: number; start: number } | undefined>(undefined);

  const handleFocus = () => {
    inputRef.current?.blur();
    inputRef.current?.focus();

    if (value != null) {
      setInternalSelection({ end: value.length, start: value.length });
    }
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const androidCusrsorSelection = Platform.OS === 'android' && {
    onSelectionChange: ({
      nativeEvent: {
        selection: { start, end },
      },
    }: NativePropsSelection) => {
      setInternalSelection({ end, start });
    },
    selection: internalSelection,
  };

  return (
    <Modal
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      hasBackdrop
      isVisible={isVisible}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
      style={styles.view}
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      propagateSwipe
      onModalShow={handleFocus}
      testID='selection-modal'>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          hideModal();
        }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ModalContainer>
            <DrawerHandle />
            <TextPickerModalHeader isValueEmpty={!!value?.length} label={label} hideModal={hideModal} onChange={onChange} required={props.required} />
            <InputModalContainer>
              <InputContainer multiline={restProps.multiline}>
                <StyledTextInput<React.ElementType>
                  testID='text-picker-modal-input'
                  {...restProps}
                  value={value}
                  disabled={false}
                  ref={inputRef}
                  editable={!disabled}
                  placeholderTextColor={theme.colors.grey.medium}
                  onChangeText={onChange}
                  onSubmitEditing={onSubmit}
                  {...androidCusrsorSelection}
                />
              </InputContainer>
              <TextInputMaxCharacters value={value} maxLength={props.maxLength} />
            </InputModalContainer>
          </ModalContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default TextPickerModal;

const ModalContainer = styled.View`
  align-items: center;
  padding-bottom: ${(props) => props.theme.metrics.spacing[5]}px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  height: 60%;
`;

const InputModalContainer = styled.View`
  height: 100%;
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  width: 100%;
  flex: 1;
`;

const InputContainer = styled.View<{ multiline?: boolean }>`
  background-color: #fff;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.grey.light};
  flex-direction: row;
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;

  ${(props) =>
    props.multiline &&
    css`
      flex: 1;
    `}
`;

const StyledTextInput = styled.TextInput`
  ${(props) => props.theme.fonts.text.body.center};
  padding: ${(props) => props.theme.metrics.spacing[2]}px;

  ${(props) =>
    props.multiline &&
    css`
      text-align-vertical: top;
      height: 100%;
      flex: 1;
    `}
  width: 100%;
`;
