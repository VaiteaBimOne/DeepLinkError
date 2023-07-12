import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Button from 'ui/main/components/Button';
import Label from 'ui/main/components/Label';

interface Props {
  onChange?: (value?: string) => void;
  hideModal: () => void;
  label?: string;
  isValueEmpty: boolean;
  required?: boolean;
}
const TextPickerModalHeader: React.FC<Props> = ({ onChange, hideModal, label, isValueEmpty, required }) => {
  const { t } = useTranslation('form');

  return (
    <Row>
      <ActionButtonWrapper>
        <ActionButton
          disabled={!isValueEmpty}
          variant='subtleDestructive'
          onPress={() => onChange?.()}
          label={t('common:clear')}
          testID='remove-button'
        />
      </ActionButtonWrapper>
      <Title numberOfLines={1} variant={{ alignment: 'center', type: 'h3' }}>
        {label}
        {required && <Text> *</Text>}
      </Title>
      <ActionButtonWrapper>
        <ActionButton variant='subtle' onPress={hideModal} label={t('apply')} testID='apply-button' isEnd />
      </ActionButtonWrapper>
    </Row>
  );
};

const Title = styled(Label)`
  text-align: center;
  flex: 2;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: -${(props) => props.theme.metrics.spacing[2]}px;
  margin-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const ActionButtonWrapper = styled.View`
  flex: 1;
`;

const ActionButton = styled(Button)<{ isEnd?: boolean }>`
  padding-left: ${(props) => props.theme.metrics.spacing[1]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[1]}px;
  align-self: ${(props) => (props.isEnd ? 'flex-end' : 'flex-start')};
`;

export default TextPickerModalHeader;
