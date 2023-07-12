import { NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import InitScreen from '../screens/InitScreen';
import AppStackNavigator, { AppStackParametersList } from './AppStackNavigator';
import { AppStackKey, InitKey } from './navigationKeys';

export type MainStackParamsList = {
  [InitKey]: undefined;
  [AppStackKey]: NavigatorScreenParams<AppStackParametersList>;
};

const Stack = createStackNavigator<MainStackParamsList>();

const MainStackNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name={InitKey} component={InitScreen} options={{ headerShown: false }} />
      <Stack.Screen name={AppStackKey} component={AppStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

// Screen Types
export type MainStackNavigationProp = StackNavigationProp<MainStackParamsList>;
export type InitScreenProp = StackNavigationProp<MainStackParamsList, typeof InitKey>;
export type AppStackNavigationProp = StackNavigationProp<MainStackParamsList, typeof AppStackKey>;

// Route Types
export type InitScreenNavigationParams = RouteProp<MainStackParamsList, typeof InitKey>;
export type AppStackNavigationParams = RouteProp<MainStackParamsList, typeof AppStackKey>;

// All Stack
export default MainStackNavigator;
