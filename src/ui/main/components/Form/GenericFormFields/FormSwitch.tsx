import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Platform, Switch, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Label from '../../Label';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  defaultValue?: boolean;
  label?: string;
  disabled: boolean;
}

const FormSwitch: React.FunctionComponent<Props> = ({ label, control, disabled, name, defaultValue, ...props }) => {
  const theme = useTheme();

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => {
        return (
          <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: theme.metrics.spacing[3] }}>
            <StyledLabel>{label}</StyledLabel>
            <Switch
              {...props}
              onValueChange={() => {
                field.onChange(!field.value);
              }}
              disabled={disabled}
              trackColor={{ false: theme.colors.grey.medium, true: theme.colors.primary.primary }}
              thumbColor={field.value ? theme.colors.white : theme.colors.switchButton}
              ios_backgroundColor={theme.colors.white}
              value={field.value}
              style={{ transform: [{ scaleX: Platform.OS === 'ios' ? 0.65 : 0.95 }, { scaleY: Platform.OS === 'ios' ? 0.65 : 0.95 }] }}
            />
          </View>
        );
      }}
      name={name}
      {...props}
    />
  );
};
const StyledLabel = styled(Label)`
  color: ${(props) => props.theme.colors.grey.medium};
`;

export default FormSwitch;
