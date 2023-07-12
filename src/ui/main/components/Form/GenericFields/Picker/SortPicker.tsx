import { IssueSortValue } from 'core/issues/domain/IssueTypes';
import { Identifier } from 'core/main/types/Identifier';
import { RfiSubmittalSortValue } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { ArrowDown, ArrowUp, Validate } from 'ui/main/assets/icons';
import Button from 'ui/main/components/Button';
import Label from 'ui/main/components/Label';
import BottomDrawer, { DrawerRef } from 'ui/main/components/drawer/BottomDrawer';
import { ASC_DIRECTION_ISSUES, DESC_DIRECTION_ISSUES } from 'ui/main/navigation/IssuesStackNavigator';
import { ASC_DIRECTION_RFIS, DESC_DIRECTION_RFIS } from 'ui/main/navigation/RfisStackNavigator';
import { normalize } from 'ui/main/utils/scalingUtils';
import { Option } from '../../GenericFormFields/FormPicker';
import ErrorText from '../ErrorText';

interface RenderPickerInputProps extends Props {
  onPress: () => void;
  value?: string;
  id?: Identifier;
  showUnsyncIndicator?: boolean;
}

export interface Props {
  error?: string;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testId?: string;
  selectedOption?: Option;
  onChange?: (value: IssueSortValue | RfiSubmittalSortValue) => void;
  options?: Option[];
  required?: boolean;
  children: (props: RenderPickerInputProps) => React.ReactNode;
  disabled?: boolean;
}

const SortPicker: React.FunctionComponent<Props> = (props) => {
  const { error, style, selectedOption, onChange, options, children, disabled, testId } = props;
  const { t } = useTranslation('issues');
  const drawerRef = useRef<DrawerRef>(null);

  const handleChange = (sort?: string | number | boolean | RfiSubmittalSortValue | IssueSortValue) => {
    if (typeof sort === 'number') {
      throw new Error('Invalid Sort type. Consider using Picker instead');
    }
    if (typeof sort === 'boolean') {
      throw new Error('Invalid Sort type. Consider using Picker instead');
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    if (sort?.toString().includes('order')) {
      onChange?.(sort as IssueSortValue);
    } else {
      onChange?.(sort as RfiSubmittalSortValue);
    }
    drawerRef.current?.close();
  };

  const value = JSON.stringify(selectedOption?.value);
  const selectedId = JSON.stringify(selectedOption?.value);

  const theme = useTheme();
  const insets = useSafeAreaInsets();
  let iconToShow = <></>;
  let textOrder = '';

  const optionsValues = options?.map((option) => {
    if (option.value.field === 'modifiedOn') {
      iconToShow = <></>;
    } else {
      if (option.value.order === ASC_DIRECTION_RFIS || option.value.direction === ASC_DIRECTION_ISSUES) {
        iconToShow = <ArrowUp width={normalize(15)} height={normalize(16)} />;
        textOrder = `(${t('issues:sort.ascending')})`;
      } else if (option.value.order === DESC_DIRECTION_RFIS || option.value.direction === DESC_DIRECTION_ISSUES) {
        iconToShow = <ArrowDown width={normalize(15)} height={normalize(16)} />;
        textOrder = `(${t('issues:sort.descending')})`;
      }
    }

    return {
      color: option.color,
      label: (
        <LabelContainer
          style={{
            ...Platform.select({
              ios: {
                marginBottom: -4,
              },
            }),
          }}>
          <Label>{option.label} </Label>
          {iconToShow}
          <Label> {textOrder}</Label>
        </LabelContainer>
      ),
      testId: JSON.stringify(option.value),
      value: JSON.stringify(option.value),
    };
  });

  return (
    <View style={style}>
      {children({ ...props, id: selectedId, onPress: () => drawerRef.current?.open(), value })}
      {!!error && <ErrorText variant={{ type: 'error' }}>{error}</ErrorText>}
      {!disabled && (
        <BottomDrawer testID={testId} title={t('sort.sort')} ref={drawerRef}>
          <OptionsContainer
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, theme.metrics.spacing[3]) }}>
            {optionsValues?.map((option) => {
              const isSelected = value === option.value;
              return (
                <OptionButton
                  testID={`${option.value}Option`}
                  key={option.value.toString()}
                  variant='default'
                  label={option.label}
                  onPress={() => handleChange(option.value)}
                  Icon={isSelected ? Validate : undefined}
                  isSelected={isSelected}
                  iconColor={theme.colors.primary.primary}
                  labelStyle={{ flexWrap: 'wrap' }}
                />
              );
            })}
          </OptionsContainer>
        </BottomDrawer>
      )}
    </View>
  );
};

const OptionButton = styled(Button)<{ isSelected?: boolean }>`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isSelected ? 'row-reverse' : 'row')};
  border-width: 2px;
  border-color: ${(props) => (props.isSelected ? props.theme.colors.primary.primary : 'transparent')};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
`;

const OptionsContainer = styled.ScrollView`
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  width: 100%;
`;

const LabelContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export default SortPicker;
