import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { GainsightScreensEnum } from 'core/gainsightPx/domain/GainsightEvents';
import GainsightController from 'core/gainsightPx/service/api/GainsightController';
import { HubPins } from 'core/hubs/domain/HubPins';
import { IssuesTypes } from 'core/issues/hooks/useControllers';
import useMenus from 'core/menu/hooks/useMenus';
import useInitProject from 'core/projects/hooks/useInitProject';
import useProject from 'core/projects/state/hooks/useProject';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/native';
import { DashboardScreen } from 'ui/dashboard/screens/DashboardScreen';
import LeaveProjectNavigationButton from 'ui/main/navigation/components/LeaveProjectNavigationButton';
import NotificationsIcon from 'ui/notifications/components/NotificationIcons';
import NotificationsHeader from 'ui/notifications/components/NotificationsHeader';
import NotificationsScreen from 'ui/notifications/screens/NotificationsScreen';
import RfiSubmittalFiltersModal, { RfiSubmittalFilterModalRef } from 'ui/rfiSubmittal/generic/components/filter/RfiSubmittalFiltersModal';
import { ModuleType, useRfiSubmittalModuleAccess } from 'ui/rfiSubmittal/generic/hooks/useRfiSubmittalModuleAccess';
import {
  Home,
  HomeFill,
  Issues,
  IssuesFill,
  Menu,
  MenuFill,
  Profile,
  ProfileFill,
  Rfi,
  RfiFilled,
  SubmittalActive,
  SubmittalDefault,
} from '../assets/icons';
import TabIcon from '../components/TabNavigator/TabIcon';
import useBanner from '../hooks/useBanner';
import { normalize } from '../utils/scalingUtils';
import { TabBarRouteParams } from './AppStackNavigator';
import CreateIssueStackNavigator, { CreateIssueStackParamsList } from './CreateIssueStackNavigator';
import IssuesStackNavigator from './IssuesStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';
import NavigationHeader from './NavigationHeader';
import ProfileStackNavigator from './ProfileStackNavigator';
import RfisStackNavigator from './RfisStackNavigator';
import SubmittalsStackNavigator from './SubmittalsStackNavigator';
import { CreateIssueTab, DashboardTab, IssuesTab, NotificationTab, MenuTab, ProfileTab, RfisTab, SubmittalsTab } from './navigationKeys';

export type TabParametersList = {
  [DashboardTab]: { hubId: string; projectId: number };
  [IssuesTab]: { hubId: string; projectId: number; type: IssuesTypes };
  [CreateIssueTab]: NavigatorScreenParams<CreateIssueStackParamsList>;
  [NotificationTab]: { hubId: string; projectId: number };
  [MenuTab]: { hubId: string; projectId: number };
  [ProfileTab]: { hubId: string; projectId: number };
  [RfisTab]: { hubId: string; projectId: number; projectName: string };
  [SubmittalsTab]: { hubId: string; projectId: number; projectName: string };
};

const Tab = createBottomTabNavigator<TabParametersList>();

interface Props {
  route: TabBarRouteParams;
}

const TabNavigator: React.FunctionComponent<Props> = ({ route }) => {
  const { t } = useTranslation('issues');
  const theme = useTheme();
  const filtersModalRef = useRef<RfiSubmittalFilterModalRef>(null);

  // Bypass validation for subscription and flag with deep linking. Validation will be done in the page
  const { hubId, projectId, showTabs, url: isDeeplinking } = route.params;

  const {
    selectors: { hasRfiAccess, hasSubmittalAccess },
  } = useRfiSubmittalModuleAccess({ hubId, moduleType: [ModuleType.RFI, ModuleType.SUBMITTAL] });

  const {
    colors,
    metrics: { iconSize },
  } = useTheme();

  const {
    actions: { showBanner },
  } = useBanner({ text: t('errors:default'), type: 'warning' });

  useInitProject({ hubId, onError: showBanner, projectId });

  const {
    selectors: { project },
  } = useProject({ hubId, projectId });

  const {
    actions: { pinIsActive },
  } = useMenus();

  const fivePercentWidth = theme.metrics.window.width / 20;

  const handleScreenChange = async (event: GainsightScreensEnum) => {
    await GainsightController.addGainsightEvent(event);
  };

  const canSeeMenuBurger = hasRfiAccess || hasSubmittalAccess;

  const hiddenTabOptionIconRfi: any =
    isDeeplinking || (hasRfiAccess && pinIsActive(HubPins.RFI, hubId)) ? {} : { tabBarItemStyle: { display: 'none' } };
  const hiddenTabOptionIconSubmittal: any =
    isDeeplinking || (hasSubmittalAccess && pinIsActive(HubPins.SUBMITTAL, hubId)) ? {} : { tabBarItemStyle: { display: 'none' } };

  return (
    <>
      <Tab.Navigator
        backBehavior='history'
        initialRouteName={DashboardTab}
        sceneContainerStyle={{ backgroundColor: theme.colors.background.default }}
        screenOptions={{
          headerShown: false,
          tabBarItemStyle: {
            height: normalize(60),
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            alignItems: 'center',
            borderTopLeftRadius: normalize(30),
            borderTopRightRadius: normalize(30),
            display: showTabs ? 'flex' : 'none',
            elevation: 24,
            height: normalize(75),
            justifyContent: 'space-evenly',
            paddingHorizontal: fivePercentWidth,
            shadowColor: theme.colors.pitchBlack,
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 5,
          },
        }}>
        {
          <Tab.Screen
            name={DashboardTab}
            listeners={{
              tabPress: () => {
                handleScreenChange(GainsightScreensEnum.DASHBOARD);
              },
            }}
            component={DashboardScreen}
            options={{
              header: () => <NavigationHeader hubId={hubId} showBorder={false} iconLeft={<LeaveProjectNavigationButton hubId={hubId} />} />,
              headerShown: true,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Home} FocusIcon={HomeFill} testID='tabDashboardIcon' />,
              tabBarShowLabel: false,
            }}
            initialParams={{ ...route.params }}
          />
        }
        {/* Always show issue if the menu burger is hidden */}
        {((canSeeMenuBurger && pinIsActive(HubPins.ISSUE, hubId)) || !canSeeMenuBurger) && (
          <Tab.Screen
            name={IssuesTab}
            component={IssuesStackNavigator}
            listeners={{
              tabPress: () => {
                handleScreenChange(GainsightScreensEnum.ISSUE_LIST);
              },
            }}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  Icon={() => <StyledIssues color={colors.black} height={iconSize[4]} width={iconSize[4]} />}
                  FocusIcon={() => <StyledIssuesFill color={colors.primary.primary} height={iconSize[4]} width={iconSize[4]} />}
                  testID='tabIssueIcon'
                />
              ),
              tabBarShowLabel: false,
            }}
            initialParams={{ ...route.params, type: IssuesTypes.Active }}
          />
        )}
        <Tab.Screen
          name={CreateIssueTab}
          component={CreateIssueStackNavigator}
          listeners={{
            tabPress: () => {
              handleScreenChange(GainsightScreensEnum.CREATE_ISSUE);
            },
          }}
          options={{
            headerShown: false,
            tabBarItemStyle: { display: 'none' },
            tabBarShowLabel: false,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name={RfisTab}
          component={RfisStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Rfi} FocusIcon={RfiFilled} testID='tabRfiIcon' />,
            tabBarShowLabel: false,
            ...hiddenTabOptionIconRfi,
          }}
          initialParams={{ ...route.params }}
        />
        <Tab.Screen
          name={SubmittalsTab}
          component={SubmittalsStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={SubmittalDefault} FocusIcon={SubmittalActive} testID='tabSubmittalIcon' />,
            tabBarShowLabel: false,
            ...hiddenTabOptionIconSubmittal,
          }}
          initialParams={{ ...route.params }}
        />
        <Tab.Screen
          name={NotificationTab}
          component={NotificationsScreen}
          listeners={{
            tabPress: () => {
              handleScreenChange(GainsightScreensEnum.NOTIFICATION);
            },
          }}
          options={{
            header: () => (
              <NavigationHeader
                hubId={hubId}
                iconRight={<NotificationsHeader hubId={hubId} projectId={projectId} />}
                title={t('notifications:title')}
              />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
            tabBarIcon: ({ focused }) => <NotificationsIcon hubId={hubId} projectId={projectId} focused={focused} />,
            tabBarShowLabel: false,
          }}
          initialParams={{ ...route.params }}
        />
        {canSeeMenuBurger ? (
          <Tab.Screen
            name={MenuTab}
            component={MenuStackNavigator}
            options={{
              header: () => (
                <NavigationHeader iconRight={<NotificationsHeader hubId={hubId} projectId={projectId} />} title={t('notifications:title')} />
              ),
              headerShown: false,
              headerTitleAlign: 'center',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Menu} FocusIcon={MenuFill} testID='menuIcon' />,
              tabBarShowLabel: false,
            }}
            initialParams={{ ...route.params }}
          />
        ) : (
          <Tab.Screen
            name={ProfileTab}
            listeners={{
              tabPress: () => {
                handleScreenChange(GainsightScreensEnum.PROFILE);
              },
            }}
            component={ProfileStackNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Profile} FocusIcon={ProfileFill} testID='tabProfiledIcon' />,
              tabBarShowLabel: false,
            }}
          />
        )}
      </Tab.Navigator>

      {!!project && project.id === route.params.projectId && (
        <RfiSubmittalFiltersModal hubId={hubId} title={t('filters.title')} ref={filtersModalRef} project={project} />
      )}
    </>
  );
};

const StyledIssues = styled(Issues)`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const StyledIssuesFill = styled(IssuesFill)`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
`;

// Screen Types
export type TabNavigationProp = BottomTabNavigationProp<TabParametersList>;
export type DashboardTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof DashboardTab>;
export type RfiTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof RfisTab>;
export type IssuesTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof IssuesTab>;
export type CreateIssueTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof CreateIssueTab>;
export type NotificationTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof NotificationTab>;
export type MenuTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof MenuTab>;
export type ProfileTabNavigationProp = BottomTabNavigationProp<TabParametersList, typeof ProfileTab>;

// Route Types
export type DashboardTabNavigationParams = RouteProp<TabParametersList, typeof DashboardTab>;
export type IssuesTabNavigationParams = RouteProp<TabParametersList, typeof IssuesTab>;
export type CreateIssueTabNavigationParams = RouteProp<TabParametersList, typeof CreateIssueTab>;
export type NotificationTabNavigationParams = RouteProp<TabParametersList, typeof NotificationTab>;
export type MenuTabNavigationParams = RouteProp<TabParametersList, typeof MenuTab>;
export type ProfileTabNavigationParams = RouteProp<TabParametersList, typeof ProfileTab>;
export type RfiTabNavigationParams = RouteProp<TabParametersList, typeof RfisTab>;

export default TabNavigator;
