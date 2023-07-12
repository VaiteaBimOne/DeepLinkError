import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import HubsScreen from 'ui/hubs/screens/HubsScreen';
import TestScreen from '../screens/TestScreen';
import { HubsKey, TabBarKey, TestKey, ProjectsKey } from './navigationKeys';
import ProjectsScreen from 'ui/projects/screens/ProjectsScreen';

export type AppStackParametersList = {
  [HubsKey]: undefined;
  [TestKey]: undefined;
  [TabBarKey]: { hubId: string; projectId: number; showTabs?: boolean; projectName?: string; url?: string };
  [ProjectsKey]: { hubId: string; hubName?: string; userName?: string; subscriptionInfo?: any };
};

const AppStack = createNativeStackNavigator<AppStackParametersList>();

const AppStackNavigator: React.FunctionComponent = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={HubsKey}
        component={HubsScreen}
        options={{
          animation: 'none'
        }}
      />
      <AppStack.Screen
        name={TestKey}
        component={TestScreen}
        options={{
          animation: 'none',
        }}
      />
      <AppStack.Screen
        name={ProjectsKey}
        component={ProjectsScreen}
        options={({ route }) => ({
          animation: 'none',
        })}
      />
    </AppStack.Navigator>
  );
};

// Screen Types
export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParametersList>;
export type HubsScreenNavigationProp = NativeStackNavigationProp<AppStackParametersList, typeof HubsKey>;
export type ProjectsScreenNavigationProp = NativeStackNavigationProp<AppStackParametersList, typeof ProjectsKey>;

// RouteNativeStackNavigationProp
export type HubsScreenNavigationParams = RouteProp<AppStackParametersList, typeof HubsKey>;
export type ProjectsScreenRouteParams = RouteProp<AppStackParametersList, typeof ProjectsKey>;
export type TabBarRouteParams = RouteProp<AppStackParametersList, typeof TabBarKey>;

export default AppStackNavigator;
