import { NavigationState, PartialState, createNavigationContainerRef } from '@react-navigation/core';

export const navigationRef = createNavigationContainerRef<ReactNavigation.RootParamList>();

export function navigate(name: keyof ReactNavigation.RootParamList, params?: any): void {
  navigationRef.current?.navigate(name, params);
}

export function resetRoot(props: PartialState<NavigationState> | NavigationState): void {
  navigationRef.current?.resetRoot(props);
}

export function goBack(): void {
  navigationRef.current?.goBack();
}

export function getCurrentRouteName(): string | undefined {
  return navigationRef.current?.getCurrentRoute()?.name;
}
