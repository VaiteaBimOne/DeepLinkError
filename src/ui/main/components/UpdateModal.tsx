import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import Button from 'ui/main/components/Button';
import Label from 'ui/main/components/Label';

export interface UpdateModalProps {
  visible: boolean;
  setIsVisible(visible: boolean): void;
  cancelAction(): void;
  openStore(): void;
}

const UpdateModal: React.FunctionComponent<UpdateModalProps> = ({ visible, setIsVisible, cancelAction, openStore }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      hasBackdrop
      isVisible={visible}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection={['down']}
      propagateSwipe
      avoidKeyboard
      testID={'sync-error-modal'}>
      <Container>
        <Content>
          <Title variant={{ type: 'h2' }} style={{ color: theme.colors.black }}>
            {t('update:title')}
          </Title>
          <Title>{t('update:message')}</Title>
        </Content>
        <Actions>
          <Button variant='subtleDefault' size='small' label={t('update:cancel')} onPress={cancelAction} />
          <ActionButton variant='primary' size='small' label={t('update:update')} onPress={openStore} />
        </Actions>
      </Container>
    </Modal>
  );
};

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.background.default};
  border-radius: 10px;
  align-items: center;
  width: 100%;
`;

export const Content = styled.View`
  padding: ${(props) => props.theme.metrics.spacing[3]}px;
  width: 100%;
`;

const Title = styled(Label)`
  margin-bottom: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const Actions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${(props) => props.theme.metrics.spacing[2]}px ${(props) => props.theme.metrics.spacing[3]}px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.grey.light};
`;

const ActionButton = styled(Button)`
  padding-left: ${(props) => props.theme.metrics.spacing[3]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
  margin-left: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export default UpdateModal;
