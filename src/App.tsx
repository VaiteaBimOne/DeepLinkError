import { NavigationContainer } from '@react-navigation/native';
import { getStateFromPath } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import LDClient from 'launchdarkly-react-native-client-sdk';
import React, { useEffect } from 'react';
import { Linking, LogBox, Platform, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components/native';
import MainStackNavigator from 'ui/main/navigation/MainStackNavigator';
import { navigationRef } from 'ui/main/navigation/RootNavigation';
import theme from 'ui/main/theme';
import './core/main/i18n/i18n';

enableFreeze(true);
enableScreens(true);

// Remove the timer error on Android coming from react-query -> https://github.com/tannerlinsley/react-query/discussions/356
LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state']);
export const client = new LDClient();
const App: React.FunctionComponent = () => {
  let initialUrl: string | null = null;

  const handleOpenURL = (event: any) => {
    if (event.url != null) {
      initialUrl = event.url;
    }
  };

  useEffect(() => {
    if (Platform.OS == 'ios') {
      Linking.addEventListener('url', handleOpenURL);
    }

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linking: any = {
    config: {
      screens: {
        AppStackNavigator: {
          screens: {
            ProjectsScreen: {
              path: 'Projects',
            },
            TestScreen: {
              path: 'Projects/test',
            },
          },
        },
      },
    },

    getStateFromPath: async (path: any, options: any) => {
      let url: string | null = null;
      if (initialUrl) {
        url = initialUrl;
      } else {
        url = await Linking.getInitialURL();
      }
      const state = getStateFromPath(path, options);
      if (!url) return;

      // Get hub by name
      const hubName = 'testHub';
      const hubId: string = 'hub-id';

      // Fallback route
      if (!state) {
        return {
          routes: [{ name: 'Hubs' }],
        };
      }

      const newState = {
        ...state,
        routes: state?.routes.map((route: any) => {
          const routeName = route.state.routes[0].name;

          if (routeName === 'ProjectsScreen') {
            route.state.routes[0].params = { hubId, hubName };
            return route;
          } else if (routeName === 'TestScreen') {
            route.state.routes[0].params = { hubId, hubName: 'mobilepremiumauto' };
            return route;
          }

          return route;
        }),
      };
      return newState;
    },
    prefixes: [
      'https://*.herokuapp.com',
      'https://*.bimtrackdev.co',
      'https://*.bimtrackqa.co',
      'https://*.bimtrackbeta.co',
      'https://*.bimtrackapp.co',
      'bimtrackapp://app',
    ],
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={theme}>
        <StatusBar animated backgroundColor={theme.colors.background.default} barStyle='dark-content' />
        <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })} ref={navigationRef} linking={linking}>
          <MainStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(App);
