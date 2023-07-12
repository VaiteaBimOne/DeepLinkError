import React, { useCallback, useEffect } from 'react';
import { InitScreenProp } from '../navigation/MainStackNavigator';
import { AppStackKey, HubsKey } from '../navigation/navigationKeys';

interface Props {
  navigation: InitScreenProp;
}

const InitScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const { replace } = navigation;

  const navigateTo = useCallback(() => {
    replace(AppStackKey, { screen: HubsKey });
  }, [replace]);

  useEffect(() => {
    navigateTo();
  }, [navigateTo]);

  return (
    <></>
  )
};

export default InitScreen;
