import React from 'react';
import { View } from 'react-native';
import Label from '../components/Label';

const EmptyScreen: React.FunctionComponent = () => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <Label>This screen has not been implemented yet.</Label>
  </View>
);

export default EmptyScreen;
