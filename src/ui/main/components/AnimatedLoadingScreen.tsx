import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Label from 'ui/main/components/Label';
import useBackButton from 'ui/main/hooks/useBackButton';
import theme from 'ui/main/theme';

interface Props {
  name?: string;
  label: string;
  onCancel?: () => void;
  testID?: string;
}

export const AnimatedLoadingScreen: React.FunctionComponent<Props> = ({ name, label, onCancel, testID }: Props) => {
  const { t } = useTranslation(['common', 'attachments']);

  useBackButton(onCancel);

  return (
    <StyledSafeView testID={testID || 'loading-screen'}>
      <ActivityIndicator size='large' color={theme.colors.primary.primary} />
      <StyledLoadingMessage variant={{ type: 'attribute' }}>{label}</StyledLoadingMessage>
      {name && <StyledLabel variant={{ type: 'body' }}>{name}</StyledLabel>}
      {onCancel && (
        <TouchableOpacity onPress={onCancel}>
          <StyledLink variant={{ type: 'link' }}>{t('common:cancel')}</StyledLink>
        </TouchableOpacity>
      )}
    </StyledSafeView>
  );
};

const StyledSafeView = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.underlayColors.pale};
  z-index: ${(props) => props.theme.metrics.zIndex.groundFloor};
  padding: ${(props) => props.theme.metrics.spacing[3]}px;
`;

const StyledLoadingMessage = styled(Label)`
  margin-top: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const StyledLabel = styled(Label)`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  color: ${(props) => props.theme.colors.grey.dark};
`;

const StyledLink = styled(Label)`
  margin-top: ${(props) => props.theme.metrics.spacing[5]}px;
`;
