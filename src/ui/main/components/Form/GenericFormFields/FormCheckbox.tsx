import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTheme } from 'styled-components/native';
import Checkbox, { CheckboxProps } from '../../Checkbox';

interface Props extends CheckboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  name: string;
  error?: string;
  defaultValue?: boolean;
}

const FormCheckbox: React.FunctionComponent<Props> = ({ control, name, defaultValue, ...props }) => {
  const theme = useTheme();
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            {...props}
            iconStyle={{ marginRight: theme.metrics.spacing[2] }}
            onPress={() => {
              field.onChange(!field.value);
            }}
            isChecked={field.value}
          />
        );
      }}
      name={name}
      {...props}
    />
  );
};

export default FormCheckbox;
