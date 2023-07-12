import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import AppSettingsScreen from 'ui/appSettings/screens/AppSettingsScreen';
import HelpScreen from 'ui/help/screens/HelpScreen';
import ProfileScreen from 'ui/profile/screen/ProfileScreen';
import NavigationHeader from './NavigationHeader';
import BasicLeftNavigationButton from './components/BasicLeftNavigationButton';
import { HelpKey, ProfileKey, AppSettingsKey } from './navigationKeys';

export type ProfileStackParamsList = {
  [ProfileKey]: undefined;
  [HelpKey]: undefined;
  [AppSettingsKey]: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

const ProfileStackNavigator: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background.default } }}>
      <Stack.Screen name={ProfileKey} component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={HelpKey}
        component={HelpScreen}
        options={{
          animation: 'none',
          header: () => <NavigationHeader title={t('help:title')} iconLeft={<BasicLeftNavigationButton />} />,
        }}
      />
      <Stack.Screen
        name={AppSettingsKey}
        component={AppSettingsScreen}
        options={{
          animation: 'none',
          header: () => <NavigationHeader title={t('appSettings:title')} iconLeft={<BasicLeftNavigationButton />} />,
        }}
      />
    </Stack.Navigator>
  );
};

// Screen Types
export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamsList>;
export type ProfileScreenProp = NativeStackNavigationProp<ProfileStackParamsList, typeof ProfileKey>;
export type HelpStackNavigationProp = NativeStackNavigationProp<ProfileStackParamsList, typeof HelpKey>;
export type AppSettingsStackNavigationProp = NativeStackNavigationProp<ProfileStackParamsList, typeof AppSettingsKey>;

// Route Types
export type ProfileScreenRouteParams = RouteProp<ProfileStackParamsList, typeof ProfileKey>;
export type AppSettingsScreenRouteParams = RouteProp<ProfileStackParamsList, typeof ProfileKey>;
export type HelpScreenRouteParams = RouteProp<ProfileStackParamsList, typeof HelpKey>;

// All Stack
export default ProfileStackNavigator;
