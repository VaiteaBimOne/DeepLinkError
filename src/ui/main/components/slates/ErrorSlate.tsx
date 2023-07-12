import React from 'react';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { normalize } from '../../utils/scalingUtils';
import Label from '../Label';

interface Props {
  SvgImage: React.FC<SvgProps>;
  text: string;
  subText?: string;
  action: { onAction: () => void; actionLabel: string };
  isLoading?: boolean;
  from?: string;
}

const ErrorSlate: React.FC<Props> = ({ from, SvgImage, text, subText, action: { onAction, actionLabel } }) => {
  const { t } = useTranslation('issues');

  return (
    <BlankSlateContainer testID='error-state'>
      <SvgImage width={normalize(100)} height={normalize(100)} />
      <StyledText variant={{ alignment: 'center', type: 'h3' }}>{text}</StyledText>
      {subText && <StyledText variant={{ alignment: 'center', type: 'body' }}>{subText}</StyledText>}
      {actionLabel.length > 0 && (
        <ActionButton variant={{ type: 'link' }} onPress={onAction}>
          {from === 'notification' ? t('common:goBackToNotification') : actionLabel}
        </ActionButton>
      )}
    </BlankSlateContainer>
  );
};
const StyledText = styled(Label)`
  padding-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  text-align: center;
`;

const ActionButton = styled(Label)`
  padding-top: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const BlankSlateContainer = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: center;
  padding-left: ${(props) => props.theme.metrics.spacing[3]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
`;

export default ErrorSlate;
