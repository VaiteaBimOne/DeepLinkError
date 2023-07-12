import React, { useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { Zoom } from '../assets/icons';
import { normalize } from '../utils/scalingUtils';
import MaskedTextInput from './Form/GenericFields/TextInput/MaskedTextInput';

export interface SearchBarProps {
  filterValues: (search: string) => void;
  mask?: (string | RegExp)[];
  canAddOption?: boolean;
  name: string;
}

export interface SearchBarRef {
  resetSearch: () => void;
}

const SearchBar: React.FunctionComponent<React.PropsWithoutRef<SearchBarProps> & React.RefAttributes<SearchBarRef>> = React.forwardRef<
  SearchBarRef,
  SearchBarProps
>(({ filterValues, mask, canAddOption, name }, ref) => {
  const [search, setSearch] = useState<string>('');
  const theme = useTheme();
  const { t } = useTranslation('issues');
  const {
    metrics: { iconSize },
  } = useTheme();

  useImperativeHandle(ref, () => ({
    resetSearch: () => {
      setSearch('');
    },
  }));

  return (
    <TextInputContainer canAddOption={canAddOption}>
      <StyledTextInput
        value={search}
        testId='search-bar'
        placeholder={canAddOption ? t('common:searchOrAdd', { category: t(`common:searchCategory.${name}`) }) : t('common:search')}
        hasLeftIcon={canAddOption}
        leftIcon={
          !canAddOption ? (
            <ZoomWrapper>
              <Zoom width={iconSize[2]} height={iconSize[2]} testID='search-icon' color={theme.colors.grey.medium} />
            </ZoomWrapper>
          ) : null
        }
        mask={mask}
        onChange={(masked) => {
          filterValues(masked);
          setSearch(masked);
        }}
      />
    </TextInputContainer>
  );
});

const TextInputContainer = styled.View<{ canAddOption: boolean | undefined }>`
  align-items: center;
  height: ${normalize(52)}px;
  width: 100%;
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[props.canAddOption ? 0 : 1]}px;
`;

const StyledTextInput = styled(MaskedTextInput)`
  width: 100%;
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const ZoomWrapper = styled(View)`
  padding-left: ${(props) => props.theme.metrics.spacing[2]}px;
`;

export default SearchBar;
