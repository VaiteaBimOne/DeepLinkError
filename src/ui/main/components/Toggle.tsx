import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';

export interface Props {
  value?: boolean;
  identifier: any;
  update: (key: any, value: boolean) => void;
  testID?: string;
}

const Toggle: React.FunctionComponent<Props> = ({ value, identifier, update, testID }: Props) => {
  const toggleValue = () => update(identifier, !value);
  const theme = useTheme();
  return (
    <Switch
      testID={testID}
      trackColor={{ false: theme.colors.grey.medium, true: theme.colors.success.success }}
      thumbColor={theme.colors.white}
      ios_backgroundColor='#3e3e3e'
      onValueChange={toggleValue}
      value={value}
    />
  );
};

export default Toggle;
