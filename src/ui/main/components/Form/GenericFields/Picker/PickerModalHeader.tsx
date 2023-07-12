import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Badge from 'ui/main/components/Badge';
import Button from 'ui/main/components/Button';
import Label from 'ui/main/components/Label';

interface Props {
  onChange?: (value?: string | number | boolean) => void;
  multi?: boolean;
  hideModal: () => void;
  label?: string;
  isEmpty?: boolean;
  badgeCount?: number;
  resetField?: () => void;
  testId?: string;
  isValueEmpty: boolean;
  required: boolean;
}

const PickerModalHeader: React.FC<Props> = ({
  onChange,
  multi,
  hideModal,
  label,
  isEmpty,
  badgeCount,
  resetField,
  testId,
  isValueEmpty,
  required,
}) => {
  const { t } = useTranslation('form');
  const theme = useTheme();

  return (
    <Row>
      <ActionButtonWrapper>
        {!required && !isEmpty && !isValueEmpty && (
          <ActionButton
            labelStyle={{ height: '100%' }}
            variant='subtleDestructive'
            onPress={() => {
              resetField ? resetField() : onChange?.();
              if (!multi) {
                hideModal();
              }
            }}
            disabled={isValueEmpty}
            label={multi ? t('common:clear') : t('common:remove')}
            testID={testId ? `remove-${testId}-button` : `remove-button`}
            numberOfLines={1}
          />
        )}
      </ActionButtonWrapper>
      <TitleWrapper>
        <Title numberOfLines={1} testID='title' variant={{ alignment: 'center', type: 'h3' }}>
          {label}
          {required && <Text> *</Text>}
        </Title>
        {!!badgeCount && <StyledBadge text={badgeCount} colors={{ background: theme.colors.grey.lighter, text: theme.colors.primary.primary }} />}
      </TitleWrapper>
      <ActionButtonWrapper>
        {!isEmpty && multi ? (
          <ActionButton
            variant='subtle'
            onPress={hideModal}
            label={t('apply')}
            testID={`apply-${label}-button`}
            isEnd
            labelStyle={{ height: '100%' }}
            numberOfLines={1}
          />
        ) : (
          <View />
        )}
      </ActionButtonWrapper>
    </Row>
  );
};

const Title = styled(Label)`
  text-align: center;
`;
const StyledBadge = styled(Badge)`
  margin-left: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const ActionButtonWrapper = styled.View`
  flex: 1;
`;

const ActionButton = styled(Button)<{ isEnd?: boolean }>`
  padding-left: ${(props) => props.theme.metrics.spacing[1]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[1]}px;
  align-self: ${(props) => (props.isEnd ? 'flex-end' : 'flex-start')};
`;

const TitleWrapper = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default PickerModalHeader;
