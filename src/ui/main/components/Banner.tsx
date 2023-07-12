import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled, { useTheme } from 'styled-components/native';
import { Close, CloseCircle, Info } from '../assets/icons';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

export interface BannerProps {
  type: BannerType;
  text: string;
  onDismiss?: () => void;
  onRetryAction?: () => void;
  actionLabel?: string;
  noMarginTop?: boolean;
}

type BannerType = 'warning' | 'error';

const Banner: React.FunctionComponent<BannerProps> = ({ type, text, onDismiss, onRetryAction, actionLabel, noMarginTop = false }) => {
  const { t } = useTranslation('sync');
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  const handleAction = () => {
    onRetryAction && onRetryAction();
    handleClose();
  };

  return (
    <Modal
      testID={'banner'}
      isVisible={isVisible}
      hasBackdrop={false}
      coverScreen={false}
      swipeDirection={['left']}
      useNativeDriver
      onSwipeMove={handleClose}
      animationOut={'slideOutLeft'}
      animationIn={'slideInDown'}
      onModalHide={() => onDismiss?.()}
      style={styles.modal}>
      <SafeAreaView edges={['left', 'right']}>
        <Container color={theme.colors[type]} noMarginTop={noMarginTop}>
          <LeftIcon>
            {type === 'error' && <CloseCircle color={theme.colors.error.dark} height={normalize(25)} width={normalize(30)} />}
            {type === 'warning' && <Info color={theme.colors.warning.dark} height={normalize(25)} width={normalize(30)} />}
          </LeftIcon>
          <Message variant={{ type: 'body' }} testID='banner-message'>
            {text}
          </Message>
          {!!onRetryAction && (
            <MessageAction onPress={handleAction} testID={'retry-btn'}>
              <Label>{actionLabel ?? t('retry')}</Label>
            </MessageAction>
          )}
          <TouchableOpacity onPress={handleClose} testID={'close-btn'}>
            <Close height={normalize(20)} width={normalize(20)} color={theme.colors.text} />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    left: 0,
    margin: normalize(8),
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const Container = styled.View<{ color: any; noMarginTop: boolean }>`
  border-radius: ${(props) => props.theme.metrics.borderRadius[3]}px;
  background-color: ${(props) => props.color.lightest};
  border: 1px;
  border-color: ${(props) => props.color.light};
  padding: ${(props) => props.theme.metrics.spacing[2]}px ${(props) => props.theme.metrics.spacing[1]}px;
  flex-direction: row;
  margin-top: ${(props) => (!props.noMarginTop ? getStatusBarHeight(true) : 0)};
  justify-content: space-between;
  align-items: center;
`;

const Message = styled(Label)`
  flex: 1;
  color: ${(props) => props.theme.colors.black};
`;

const MessageAction = styled(TouchableOpacity)`
  margin-left: ${(props) => props.theme.metrics.spacing[0]}px;
  margin-right: ${(props) => props.theme.metrics.spacing[2]}px;
  color: ${(props) => props.theme.colors.black};
`;

const LeftIcon = styled.View`
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export default Banner;
