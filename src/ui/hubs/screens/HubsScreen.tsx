import React from 'react';
import { Text } from 'react-native';
import { HubsScreenNavigationProp } from 'ui/main/navigation/AppStackNavigator';

interface Props {
  navigation: HubsScreenNavigationProp;
}

const HubsScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  return (
    <>
      <Text>Hubs screen</Text>
    </>
  );
};

export default HubsScreen;
