import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import SectionSeparator from 'ui/rfiSubmittal/generic/components/SectionSeparator';
import { normalize } from '../utils/scalingUtils';

interface Props {
  isCollapsed: boolean;
  needCollapsable: boolean;
  handleCollapse: () => void;
  minCollapsedHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const MIN_COLLAPSED_HEIGHT = 90;

const MaskedCollapsable: React.FC<Props> = ({
  isCollapsed,
  needCollapsable,
  children,
  handleCollapse,
  minCollapsedHeight = normalize(MIN_COLLAPSED_HEIGHT),
  style,
}) => {
  const { t } = useTranslation('common');
  const getHeight = () => {
    if (!needCollapsable) {
      return 'auto';
    }

    return isCollapsed ? minCollapsedHeight : 'auto';
  };

  const getColorGradient = () => {
    if (!needCollapsable) {
      return 'white';
    }

    return isCollapsed ? 'rgba(0,0,0,0)' : 'black';
  };

  return (
    <>
      <MaskedView
        style={{ height: getHeight() }}
        maskElement={<LinearGradient colors={['white', 'white', getColorGradient()]} style={{ flex: 1 }} />}>
        {children}
      </MaskedView>
      {needCollapsable && (
        <ShowMoreButton onPress={handleCollapse} style={style}>
          <SectionSeparator text={isCollapsed ? t('showMore') : t('showLess')} />
        </ShowMoreButton>
      )}
    </>
  );
};

const ShowMoreButton = styled.Pressable`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
`;

export default MaskedCollapsable;
