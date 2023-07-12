import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useConnectivity } from 'core/connectivity/hooks/useConnectivity';
import LocaleService from 'core/main/services/LocaleService';
import useProject from 'core/projects/state/hooks/useProject';
import { RfiSubmittal, RfiSubmittalCapability, RfiSubmittalType, StatusType, StatusTypeFr } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import useRfiSubmittalCapabilities from 'core/rfiSubmittal/generic/hooks/useRfiSubmittalCapabilities';
import useRfiSubmittalDetails from 'core/rfiSubmittal/generic/hooks/useRfiSubmittalDetails';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import DiscardWarningModal, { DiscardWarningModalRef } from 'ui/issues/components/DiscardWarningModal';
import NavigationHeader from 'ui/main/navigation/NavigationHeader';
import useUpdateRfiSubmittalForm from 'ui/rfiSubmittal/generic/hooks/useUpdateRfiSubmittalForm';
import RfiSubmittalDetailsScreen from 'ui/rfiSubmittal/generic/screens/RfiSubmittalDetailsScreen';
import RfisSubmittalDetailsQuickAction from 'ui/rfiSubmittal/rfis/forms/RfisSubmittalDetailsQuickAction';
import { More } from '../assets/icons';
import { DrawerRef } from '../components/drawer/BottomDrawer';
import useBanner from '../hooks/useBanner';
import { RfiDetailsScreenRouteParams } from './AppContentStackNavigator';
import RfiDetailTopNavigator from './RfiSubmittalDetailTopNavigator';
import RfisStackNavigator from './RfisStackNavigator';
import { navigationRef } from './RootNavigation';
import BasicLeftNavigationButton from './components/BasicLeftNavigationButton';
import NavigationButton from './components/NavigationButton';
import { RfiSubmittalActionsBottomDrawer } from './components/RfiSubmittalActionsBottomDrawer';
import { RfisDetailsKey, RfisTabKey, RfisWorkflowsKey, RfisAttachmentsKey } from './navigationKeys';

export type RfisStackParamsList = {
  [RfisDetailsKey]: { hubId: string; projectId: number; rfis: RfiSubmittal; type: 'Details'; rfiSubmittalType: RfiSubmittalType.RFI };
  [RfisWorkflowsKey]: { hubId: string; projectId: number; rfis: RfiSubmittal; type: 'Workflows'; rfiSubmittalType: RfiSubmittalType.RFI };
  [RfisAttachmentsKey]: { hubId: string; projectId: number; rfis: RfiSubmittal; type: 'Attachments'; rfiSubmittalType: RfiSubmittalType.RFI };
  [RfisTabKey]: { hubId: string; projectId: number; rfis: RfiSubmittal; type: ''; rfiSubmittalType: RfiSubmittalType.RFI };
};

interface Props {
  route: RfiDetailsScreenRouteParams;
}

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RfisStackParamsList>();

const RfisDetailsStackNavigator: React.FunctionComponent<Props> = ({ route }) => {
  const { t } = useTranslation('rfis');

  const drawerRef = useRef<DrawerRef>(null);
  const drawerAnswersRef = useRef<DrawerRef>(null);
  const theme = useTheme();
  const discardWarningModalRef = useRef<DiscardWarningModalRef>(null);
  const { isOnline } = useConnectivity();
  const [dirtyForm, setDirtyForm] = useState<boolean>(false);

  const {
    params: { hubId, projectId, id: rfiId },
  } = route;

  const { width, height } = Dimensions.get('window');
  const {
    actions: { showBanner },
  } = useBanner({ text: t('errors:default'), type: 'warning' });

  const {
    selectors: { rfiSubmittal: rfis },
  } = useRfiSubmittalDetails({ hubId, id: rfiId, onError: showBanner, projectId, rfiSubmittalType: RfiSubmittalType.RFI });

  const titleHeader = rfis?.number ? `${t('rfi')}  #${rfis?.number}` : `${t('rfis')}`;
  const {
    selectors: { capabilities, actionCapabilities, isLoading: capabilitiesLoading },
  } = useRfiSubmittalCapabilities({ hubId, id: rfiId, projectId, type: RfiSubmittalType.RFI });

  const {
    selectors: { project },
  } = useProject({ hubId, projectId });

  const capabilitiesAnswer = capabilities.filter(function (capability) {
    return capability.includes('response');
  });

  const disabledForward =
    capabilities.filter(function (capability) {
      return capability.includes('forward');
    }).length === 0;

  const openDiscardModal = () => discardWarningModalRef.current?.open();
  const openActionsDrawer = () => drawerRef.current?.open();

  const {
    actions: { initializeRfiForm },
  } = useUpdateRfiSubmittalForm({
    onSubmitRfi: () => {},
    onSubmitSubmittal: () => {},
    rfiSubmittal: rfis,
  });

  const isReviewer =
    project?.permission.isReviewer && capabilities.length > 0 && capabilities.includes(RfiSubmittalCapability.CAN_SUBMIT_REVIEW_RESPONSE);
  const language = LocaleService.getLanguage();
  const closeStatus = language === 'fr' ? StatusTypeFr.Closed : StatusType.Closed;

  return (
    <>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background.default }, presentation: 'modal' }}>
        <Stack.Screen
          name={RfisTabKey}
          options={{
            animation: 'none',
            header: () => (
              <NavigationHeader
                details={true}
                iconLeft={<BasicLeftNavigationButton />}
                title={titleHeader}
                showBorder={false}
                iconRight={
                  actionCapabilities && actionCapabilities.length > 0 ? (
                    <NavigationButton onPress={() => drawerRef.current?.open()}>
                      <More />
                    </NavigationButton>
                  ) : null
                }
              />
            ),
          }}
          children={() => (
            <>
              <Tab.Navigator
                sceneContainerStyle={{ backgroundColor: theme.colors.background.default }}
                initialLayout={{ height, width }}
                tabBar={(props) => <RfiDetailTopNavigator showTabNavigator={isOnline} {...props} route={route} />}>
                <Tab.Screen
                  key={RfisDetailsKey}
                  name={RfisDetailsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.RFI,
                    setDirtyForm,

                    type: 'Details',
                  }}
                  options={{ tabBarTestID: 'rfiDetailTab' }}
                />

                <Tab.Screen
                  key={RfisWorkflowsKey}
                  name={RfisWorkflowsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.RFI,
                    type: 'Workflows',
                  }}
                  options={{ tabBarTestID: 'rfiWorkflowTab' }}
                />

                <Tab.Screen
                  key={RfisAttachmentsKey}
                  name={RfisAttachmentsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.RFI,
                    type: 'Attachments',
                  }}
                  options={{ tabBarTestID: 'rfiAttachmentTab' }}
                />
              </Tab.Navigator>
              {isOnline &&
                rfis?.status.name !== closeStatus &&
                (capabilitiesAnswer?.length !== 0 || !disabledForward) &&
                !capabilitiesLoading &&
                !dirtyForm && (
                  <RfisSubmittalDetailsQuickAction
                    isReviewer={isReviewer}
                    hubId={hubId}
                    rfiSubmittalType={RfiSubmittalType.RFI}
                    projectId={projectId}
                    id={rfiId}
                    disabledAnswer={capabilitiesAnswer?.length === 0}
                    disabledForward={disabledForward}
                    openSubmitResponseDrawer={() => drawerAnswersRef.current?.open()}
                  />
                )}
            </>
          )}
        />
      </Stack.Navigator>
      <RfiSubmittalActionsBottomDrawer
        hubId={route.params.hubId}
        capabilities={capabilities}
        rfiSubmittalType={RfiSubmittalType.RFI}
        projectId={route.params.projectId}
        title={t('actions.title')}
        id={rfiId}
        ref={drawerRef}
      />
      <RfiSubmittalActionsBottomDrawer
        hubId={hubId}
        capabilities={capabilitiesAnswer}
        rfiSubmittalType={RfiSubmittalType.RFI}
        projectId={projectId}
        title={t('actions.title')}
        id={rfiId}
        ref={drawerAnswersRef}
      />
      <DiscardWarningModal
        ref={discardWarningModalRef}
        goBack={() => {
          // @ts-expect-error : TODO try to fix this but its doing exactly what we need to do ( going to the last place we were on the rfi list )
          navigationRef!.navigate(RfisStackNavigator);
        }}
        initializeForm={initializeRfiForm}
      />
    </>
  );
};

// Screen Types
export type IssuesStackNavigationProp = NativeStackNavigationProp<RfisStackParamsList>;
export type DetailsScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof RfisDetailsKey>;
export type WorkflowsScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof RfisWorkflowsKey>;
export type AttachmentsScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof RfisAttachmentsKey>;

// Route Types
export type RfisStackRouteParams = RouteProp<RfisStackParamsList, typeof RfisTabKey>;
export type DetaiiScreenRouteParams = RouteProp<RfisStackParamsList, typeof RfisDetailsKey>;
export type WorkflowsScreenRouteParams = RouteProp<RfisStackParamsList, typeof RfisWorkflowsKey>;
export type AttachmentsScreenRouteParams = RouteProp<RfisStackParamsList, typeof RfisAttachmentsKey>;

// All Stack
export default RfisDetailsStackNavigator;
