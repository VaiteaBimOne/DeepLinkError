import { GenericRfiSubmittalCustomAttributesTypes } from 'core/rfiSubmittal/rfis/domain/RfisAttributesTypes';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { IssuesBlankSlate, Validate } from 'ui/main/assets/icons';
import Label from 'ui/main/components/Label';
import OptionButton from 'ui/main/components/OptionButton';
import SearchBar, { SearchBarRef } from 'ui/main/components/SearchBar';
import DrawerHandle from 'ui/main/components/drawer/DrawerHandle';
import EmptySlate from 'ui/main/components/slates/EmptySlate';
import { Option } from '../../GenericFormFields/FormPicker';
import PickerModalHeader from './PickerModalHeader';
import PickerOptionSkeleton from './skeletons/PickerOptionSkeleton';

interface Props {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  options?: Option[];
  label?: string;
  onChange?: (value?: string | number | boolean, label?: string) => void;
  value?: any;
  required?: boolean;
  multi?: boolean;
  testId?: string;
  resetField?: () => void;
  isLoading?: boolean;
  mask?: (string | RegExp)[];
  canAddOption?: boolean;
  searchSubtext?: string;
  name: string;
  minLength?: number;
}

const PickerModal: React.FC<Props> = ({
  value,
  isVisible,
  setIsVisible,
  options,
  label,
  onChange,
  multi,
  testId,
  resetField,
  isLoading,
  required,
  mask,
  canAddOption = false,
  searchSubtext,
  name,
  minLength,
}) => {
  const THRESHOLD_TO_SHOW_SEARCH_BAR = 10;
  const searchBarRef = useRef<SearchBarRef>(null);
  const [values, setValues] = useState(options);
  const hideModal = () => {
    setIsVisible(false);
    setValues(options);
  };

  useEffect(() => {
    if (options) {
      setValues(options);
    }
  }, [options]);

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const isEmpty = !options?.length;
  const { t } = useTranslation('issues');

  const filterValues = (search: string) => {
    if (search) {
      const filteredValues = options?.filter((option) =>
        option.label
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            search
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
      );

      canAddOption &&
        filteredValues!.push({
          label: search,
          new: true,
          value: { customName: search, id: 0 } as GenericRfiSubmittalCustomAttributesTypes,
        } as Option);

      setValues(filteredValues);
    } else {
      setValues(options);
    }
  };

  const handleOnPressOption = (option: Option) => {
    if (minLength && minLength > option.label.length) {
      return;
    }

    searchBarRef.current?.resetSearch();
    onChange?.(option.value, option.label);
  };

  return (
    <Modal
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      hasBackdrop
      isVisible={isVisible}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
      backdropTransitionOutTiming={0}
      style={styles.view}
      useNativeDriver={false}
      propagateSwipe
      avoidKeyboard
      testID={testId ? `selection-modal-${testId}` : 'selection-modal'}>
      <Container>
        <DrawerHandle />
        <PickerModalHeader
          isEmpty={isEmpty}
          isValueEmpty={value === undefined || value.length === 0}
          onChange={onChange}
          resetField={resetField}
          testId={testId}
          label={label}
          required={required || false}
          multi={multi}
          hideModal={hideModal}
          badgeCount={multi && value !== undefined ? value.length : 0}
        />

        {isLoading && <PickerOptionSkeleton />}

        {isEmpty && !isLoading && (
          <EmptySlate
            testID='picker-modal-empty-state'
            SvgImage={IssuesBlankSlate}
            text={t('create.emptyStateMessage')}
            subText={t('create.emptyStateSubMessage')}
          />
        )}
        {((!!options && options.length >= THRESHOLD_TO_SHOW_SEARCH_BAR) || canAddOption) && (
          <SearchBar filterValues={filterValues} mask={mask} canAddOption={canAddOption} ref={searchBarRef} name={name} />
        )}
        {searchSubtext && <SearchSubtext variant={{ alignment: 'left', type: 'selectSearchSubtext' }}>{searchSubtext}</SearchSubtext>}
        {!isEmpty && (
          <OptionsContainer
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, theme.metrics.spacing[3]) }}>
            {values?.map((option, i) => {
              const isSelected = multi ? !!value?.includes(option.value) : value === option.value;
              let label = option.label;
              if (option.description) {
                label = `${label}\n${option.description}`;
              }

              return option.description || option.showAvatar ? (
                <MultipleOptionButton
                  testID={`${option.value}Option`}
                  key={`${option.value.toString()}${i}`}
                  variant='default'
                  label={option.label}
                  description={option.description}
                  avatarUrl={option.avatarUrl}
                  initials={option.initials}
                  onPress={() => handleOnPressOption(option)}
                  Icon={isSelected ? Validate : undefined}
                  isSelected={isSelected}
                  iconColor={theme.colors.primary.primary}
                  newOption={option.new}
                  showAvatar={option.showAvatar}
                />
              ) : (
                <SingleOptionButton
                  testID={`${option.value}Option`}
                  key={`${option.value.toString()}${i}`}
                  variant='default'
                  label={label}
                  description={option.description}
                  avatarUrl={option.avatarUrl}
                  initials={option.initials}
                  onPress={() => handleOnPressOption(option)}
                  Icon={isSelected ? Validate : undefined}
                  isSelected={isSelected}
                  iconColor={theme.colors.primary.primary}
                  newOption={option.new}
                  showAvatar={option.showAvatar}
                />
              );
            })}
          </OptionsContainer>
        )}
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default PickerModal;

const Container = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-top-left-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  border-top-right-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  height: 60%;
`;

const SearchSubtext = styled(Label)`
  align-self: flex-start;
  margin-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[0]}px;
`;

const SingleOptionButton = styled(OptionButton)<{ isSelected?: boolean }>`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  display: flex;
  justify-content: flex-start;
  flex-direction: ${(props) => (props.isSelected ? 'row-reverse' : 'row')};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
`;

const MultipleOptionButton = styled(OptionButton)<{ isSelected?: boolean }>`
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  align-items: flex-start;
  flex-direction: column;
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
`;

const OptionsContainer = styled.ScrollView`
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  width: 100%;
`;
