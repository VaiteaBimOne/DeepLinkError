import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import { Close } from '../assets/icons';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

const Container = styled.View<{ color: string }>`
  width: ${normalize(250)}px;
  border-radius: ${(props) => props.theme.metrics.borderRadius[1]}px;
  background-color: ${(props) => props.theme.colors.black};
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Message = styled(Label)`
  flex: 1;
  color: ${(props) => props.theme.colors.white};
`;

export interface ToastProps {
  type: ToastType;
  text: string;
  onDismiss?: () => void;
}

type ToastType = 'success';

const Toast: React.FunctionComponent<ToastProps> = ({ type, text, onDismiss }) => {
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  return (
    <Modal
      testID={'toast'}
      isVisible={isVisible}
      hasBackdrop={false}
      coverScreen={false}
      swipeDirection={['left']}
      useNativeDriver
      onSwipeMove={handleClose}
      animationOut={'slideOutLeft'}
      animationIn={'slideInUp'}
      onModalHide={() => onDismiss?.()}
      style={[styles.modal]}>
      <Container color={theme.colors[type].lighter}>
        <Message variant={{ type: 'body' }} testID='toast-message'>
          {text}
        </Message>
        <TouchableOpacity onPress={handleClose} testID={'close-btn'}>
          <Close height={normalize(20)} width={normalize(20)} color={theme.colors.white} />
        </TouchableOpacity>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    zIndex: 100,
  },
});

export default Toast;
