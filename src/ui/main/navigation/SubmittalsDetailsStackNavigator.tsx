import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useConnectivity } from 'core/connectivity/hooks/useConnectivity';
import LocaleService from 'core/main/services/LocaleService';
import { RfiSubmittal, RfiSubmittalType, StatusType, StatusTypeFr } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
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
import { SubmittalsDetailsScreenRouteParams } from './AppContentStackNavigator';
import RfiDetailTopNavigator from './RfiSubmittalDetailTopNavigator';
import { navigationRef } from './RootNavigation';
import SubmittalsStackNavigator from './SubmittalsStackNavigator';
import BasicLeftNavigationButton from './components/BasicLeftNavigationButton';
import NavigationButton from './components/NavigationButton';
import { RfiSubmittalActionsBottomDrawer } from './components/RfiSubmittalActionsBottomDrawer';
import { SubmittalsDetailsKey, SubmittalsWorkflowsKey, SubmittalsAttachmentsKey, SubmittalsTabKey } from './navigationKeys';

export type SubmittalsStackParamsList = {
  [SubmittalsDetailsKey]: {
    hubId: string;
    projectId: number;
    submittals: RfiSubmittal;
    type: 'Details';
    rfiSubmittalType: RfiSubmittalType.SUBMITTAL;
  };
  [SubmittalsWorkflowsKey]: {
    hubId: string;
    projectId: number;
    submittals: RfiSubmittal;
    type: 'Workflows';
    rfiSubmittalType: RfiSubmittalType.SUBMITTAL;
  };
  [SubmittalsAttachmentsKey]: {
    hubId: string;
    projectId: number;
    submittals: RfiSubmittal;
    type: 'Attachments';
    rfiSubmittalType: RfiSubmittalType.SUBMITTAL;
  };
  [SubmittalsTabKey]: { hubId: string; projectId: number; submittals: RfiSubmittal; type: ''; rfiSubmittalType: RfiSubmittalType.SUBMITTAL };
};

interface Props {
  route: SubmittalsDetailsScreenRouteParams;
}

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<SubmittalsStackParamsList>();

const SubmittalsDetailsStackNavigator: React.FunctionComponent<Props> = ({ route }) => {
  const { t } = useTranslation('rfis');
  const [dirtyForm, setDirtyForm] = useState<boolean>(false);
  const drawerRef = useRef<DrawerRef>(null);
  const { isOnline } = useConnectivity();
  const drawerAnswersRef = useRef<DrawerRef>(null);
  const theme = useTheme();
  const discardWarningModalRef = useRef<DiscardWarningModalRef>(null);
  const {
    params: { hubId, projectId, id: submittalId },
  } = route;

  const { width, height } = Dimensions.get('window');
  const {
    actions: { showBanner },
  } = useBanner({ text: t('errors:default'), type: 'warning' });

  const {
    selectors: { rfiSubmittal: submittal },
  } = useRfiSubmittalDetails({ hubId, id: submittalId, onError: showBanner, projectId, rfiSubmittalType: RfiSubmittalType.SUBMITTAL });

  const titleHeader = submittal?.number ? `${t('rfi')}  #${submittal?.number}` : `${t('rfis')}`;
  const {
    selectors: { capabilities, actionCapabilities, isLoading: capabilitiesLoading },
  } = useRfiSubmittalCapabilities({ hubId, id: submittalId, projectId, type: RfiSubmittalType.SUBMITTAL });

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
    actions: { initializeRfiForm: initializeForm },
  } = useUpdateRfiSubmittalForm({
    onSubmitRfi: () => {},
    onSubmitSubmittal: () => {},
    rfiSubmittal: submittal,
  });
  const language = LocaleService.getLanguage();
  const closeStatus = language === 'fr' ? StatusTypeFr.Closed : StatusType.Closed;

  return (
    <>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background.default }, presentation: 'modal' }}>
        <Stack.Screen
          name={SubmittalsTabKey}
          options={{
            animation: 'none',
            header: () => (
              <NavigationHeader
                details
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
                  key={SubmittalsDetailsKey}
                  name={SubmittalsDetailsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.SUBMITTAL,
                    setDirtyForm,
                    type: 'Details',
                  }}
                  options={{ tabBarTestID: 'submittalDetailTab' }}
                />

                <Tab.Screen
                  key={SubmittalsWorkflowsKey}
                  name={SubmittalsWorkflowsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.SUBMITTAL,
                    type: 'Workflows',
                  }}
                  options={{ tabBarTestID: 'submittalWorkflowTab' }}
                />

                <Tab.Screen
                  key={SubmittalsAttachmentsKey}
                  name={SubmittalsAttachmentsKey}
                  component={RfiSubmittalDetailsScreen}
                  initialParams={{
                    ...route.params,
                    capabilities: capabilities,
                    openActionsDrawer: openActionsDrawer,
                    openDiscardModal: openDiscardModal,
                    rfiSubmittalType: RfiSubmittalType.SUBMITTAL,
                    type: 'Attachments',
                  }}
                  options={{ tabBarTestID: 'submittalAttachmentTab' }}
                />
              </Tab.Navigator>
              {isOnline &&
                submittal?.status.name !== closeStatus &&
                (capabilitiesAnswer?.length !== 0 || !disabledForward) &&
                !capabilitiesLoading &&
                !dirtyForm && (
                  <RfisSubmittalDetailsQuickAction
                    hubId={hubId}
                    projectId={projectId}
                    id={submittalId}
                    rfiSubmittalType={RfiSubmittalType.SUBMITTAL}
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
        rfiSubmittalType={RfiSubmittalType.SUBMITTAL}
        projectId={route.params.projectId}
        title={t('actions.title')}
        id={submittalId}
        ref={drawerRef}
      />
      <RfiSubmittalActionsBottomDrawer
        hubId={hubId}
        rfiSubmittalType={RfiSubmittalType.SUBMITTAL}
        capabilities={capabilitiesAnswer}
        projectId={projectId}
        title={t('actions.title')}
        id={submittalId}
        ref={drawerAnswersRef}
      />
      <DiscardWarningModal
        ref={discardWarningModalRef}
        goBack={() => {
          // @ts-expect-error : TODO try to fix this but its doing exactly what we need to do ( going to the last place we were on the rfi list )
          navigationRef!.navigate(SubmittalsStackNavigator);
        }}
        initializeForm={initializeForm}
      />
    </>
  );
};

// Screen Types
export type IssuesStackNavigationProp = NativeStackNavigationProp<SubmittalsStackParamsList>;
export type DetailsScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof SubmittalsDetailsKey>;
export type WorkflowsScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof SubmittalsWorkflowsKey>;
export type AttachmentsScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof SubmittalsAttachmentsKey>;

// Route Types
export type SubmittalsStackRouteParams = RouteProp<SubmittalsStackParamsList, typeof SubmittalsTabKey>;
export type DetaiiScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof SubmittalsDetailsKey>;
export type WorkflowsScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof SubmittalsWorkflowsKey>;
export type AttachmentsScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof SubmittalsAttachmentsKey>;

// All Stack
export default SubmittalsDetailsStackNavigator;
