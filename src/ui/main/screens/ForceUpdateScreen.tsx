import Monitoring from 'core/main/services/Monitoring';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ImageBackground, Linking, Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';
import styled from 'styled-components/native';
import { Background, NewformaKonektImageLogo } from 'ui/main/assets/images/index';
import Button from '../components/Button';
import Label from '../components/Label';

const IOS_STORE_LINK = 'itms-apps://apps.apple.com/id/app/bim-track/id1576522728';
const ANDROID_STORE_LINK = 'market://details?id=com.bimtrack.bimtrack';

export enum ForceUpdateEnum {
  EXPERIENCE = 1,
  SECURITY = 2,
  REGULATORY = 3,
}

interface Props {
  forceUpdateType?: ForceUpdateEnum;
}

const ForceUpdateScreen: React.FunctionComponent<Props> = ({ forceUpdateType = ForceUpdateEnum.EXPERIENCE }) => {
  const { t } = useTranslation('forceUpdate');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  // Prevent back from OS
  const handleBackButton = () => {
    return true;
  };

  const handleStoreUpdatePress = () => {
    const link = Platform.OS === 'ios' ? IOS_STORE_LINK : ANDROID_STORE_LINK;

    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => Monitoring.trackError(err),
    );
  };

  const getTitle = () => {
    switch (forceUpdateType) {
      case ForceUpdateEnum.EXPERIENCE:
        return t('titleExperience');
        break;
      case ForceUpdateEnum.SECURITY:
        return t('titleSecurity');
        break;
      case ForceUpdateEnum.REGULATORY:
        return t('titleRegulatory');
        break;
    }
  };

  const getBody = () => {
    switch (forceUpdateType) {
      case ForceUpdateEnum.EXPERIENCE:
        return t('bodyExperience');
        break;
      case ForceUpdateEnum.SECURITY:
        return t('bodySecurity');
        break;
      case ForceUpdateEnum.REGULATORY:
        return t('bodyRegulatory');
        break;
    }
  };

  return (
    <Container>
      <ImageBackground source={Background} resizeMode='cover' style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <NewformaKonektImageLogo />
        <ContainerBody>
          <Title variant={{ type: 'forceUpdateTitle' }}>{getTitle()}</Title>
          <Body variant={{ type: 'forceUpdateBody' }}>{getBody()}</Body>
          <UpdateButton label={t('buttonUpdate')} variant='primary' onPress={handleStoreUpdatePress} testID='store-button-update' />
        </ContainerBody>
      </ImageBackground>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ContainerBody = styled.View`
  width: ${isTablet() ? '70%' : '90%'};
`;

const Title = styled(Label)`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: ${(props) => props.theme.metrics.spacing[7]}px;
`;

const Body = styled(Label)`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: ${(props) => props.theme.metrics.spacing[4]}px;
`;
const UpdateButton = styled(Button)`
  width: 100%;
  margin-top: ${(props) => props.theme.metrics.spacing[5]}px;
`;

export default ForceUpdateScreen;
