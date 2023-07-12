import React from 'react';
import { Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';
import styled from 'styled-components/native';
import HighlightedLabel from '../HighlightedLabel';
import Label from '../Label';
import GenericAttribute from './GenericAttribute';

type NullableString = string | undefined | null;

interface Props {
  value?: NullableString;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  testId?: string;
  showUnsyncIcon?: boolean;
}

const TitleAttribute: React.FunctionComponent<Props> = ({ value, onPress, disabled, testId, showUnsyncIcon }) => {
  const getHighlightMargin = () => {
    if (isTablet()) {
      return Platform.OS == 'ios' ? -1 : -9;
    }

    return Platform.OS == 'ios' ? -2 : -5;
  };

  return (
    <GenericAttribute testId={testId} onPress={onPress} disabled={disabled} showCaret={false} isTitle showUnsyncIndicator={showUnsyncIcon}>
      <ValueContainer>
        <Label variant={{ type: 'h3' }} style={{ fontFamily: 'CircularStd-Book', fontWeight: 'bold' }}>
          <HighlightedLabel
            text={value}
            variant={{ type: 'h3' }}
            style={{ fontFamily: 'CircularStd-Book', fontWeight: 'bold' }}
            lineHeight={22}
            margin={getHighlightMargin()}
          />
        </Label>
      </ValueContainer>
    </GenericAttribute>
  );
};

export default TitleAttribute;

const ValueContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-right: ${(props) => props.theme.metrics.spacing[3]}px;
`;
