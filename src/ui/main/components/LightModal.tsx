import React, { useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Button, { ButtonVariant } from 'ui/main/components/Button';
import Label from 'ui/main/components/Label';

export interface LightModalRef {
  open: () => void;
  close: () => void;
}

export interface LightModalProps {
  onConfirm: () => void;
  title: string;
  description: string;
  actionLabel: string;
  actionVariant?: ButtonVariant;
}

const LightModal: React.FunctionComponent<React.PropsWithoutRef<LightModalProps> & React.RefAttributes<LightModalRef>> = React.forwardRef<
  LightModalRef,
  LightModalProps
>(({ onConfirm, title, description, actionLabel, actionVariant = 'destructive' }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    close: () => {
      setIsVisible(false);
    },
    open: () => {
      setIsVisible(true);
    },
  }));

  const handleConfirm = () => {
    onConfirm();
    setIsVisible(false);
  };

  return (
    <Modal
      animationIn='fadeIn'
      animationOut='fadeOut'
      useNativeDriver
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      hasBackdrop
      isVisible={isVisible}
      onSwipeComplete={() => setIsVisible(false)}
      testID={'light-modal'}>
      <ModalContent>
        <Title variant={{ type: 'h3' }}>{title}</Title>
        <Description variant={{ type: 'body' }}>{description}</Description>

        <Actions>
          <Button variant='subtleDefault' size='small' label={t('common:cancel')} onPress={() => setIsVisible(false)} />
          <ActionButton variant={actionVariant} size='small' label={actionLabel} onPress={handleConfirm} />
        </Actions>
      </ModalContent>
    </Modal>
  );
});

export default LightModal;

const ModalContent = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  padding-top: ${(props) => props.theme.metrics.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const Title = styled(Label)`
  margin-horizontal: ${(props) => props.theme.metrics.spacing[3]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const Description = styled(Label)`
  margin-horizontal: ${(props) => props.theme.metrics.spacing[3]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[4]}px;
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.grey.lighter};
  padding-top: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const ActionButton = styled(Button)`
  margin-left: ${(props) => props.theme.metrics.spacing[2]}px;
  margin-right: ${(props) => props.theme.metrics.spacing[2]}px;
`;
