import { RfiSubmittalType } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { NoInternet } from '../../assets/icons';
import { normalize } from '../../utils/scalingUtils';
import Label from '../Label';

const StyledSubText = styled(Label)`
  color: ${(props) => props.theme.colors.grey.medium};
  text-align: center;
`;

const StyledText = styled(Label)`
  text-align: center;
`;

const BlankSlateContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
  padding-left: ${(props) => props.theme.metrics.spacing[3]}px;
`;

const RefreshButton = styled(Label)`
  padding-top: ${(props) => props.theme.metrics.spacing[3]}px;
`;

interface Props {
  onRefresh?: () => void;
  rfiSubmittalType?: RfiSubmittalType;
}

const OfflineSlate: React.FC<Props> = ({ onRefresh }) => {
  const { t } = useTranslation();

  const getBlankSlate = () => {
    return <NoInternet width={normalize(100)} height={normalize(100)} />;
  };

  return (
    <BlankSlateContainer testID={'offline-state'}>
      {getBlankSlate()}
      <StyledText variant={{ type: 'h3' }}>{t('common:noInternetConnection')}</StyledText>
      <StyledSubText variant={{ type: 'h4' }}>{t('common:checkInternetConnection')}</StyledSubText>

      {onRefresh && (
        <RefreshButton variant={{ type: 'link' }} onPress={() => onRefresh()}>
          {t('common:refreshPage')}
        </RefreshButton>
      )}
    </BlankSlateContainer>
  );
};

export default OfflineSlate;
