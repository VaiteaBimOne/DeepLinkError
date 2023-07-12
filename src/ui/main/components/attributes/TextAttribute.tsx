import { RootState } from 'core/redux/store';
import { selectProfile } from 'core/users/state/profileSelectors';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import ParagraphField from '../ParagraphField';
import GenericAttribute from './GenericAttribute';

const ValueContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-right: ${(props) => props.theme.metrics.spacing[3]}px;
`;

type NullableString = string | undefined | null;

interface Props {
  value?: NullableString;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  testId?: string;
  showUnsyncIndicator?: boolean;
  isDate?: boolean;
}
export const MINIMUM_CHAR_DATE = 8;

const TextAttribute: React.FunctionComponent<Props> = ({ showUnsyncIndicator, label, value, onPress, disabled, showCaret, testId, isDate }) => {
  const { dateFormat } = useSelector((state: RootState) => selectProfile(state));

  let showValue = '-';

  if (value && isDate) {
    showValue = moment.utc(new Date(value)).format(dateFormat);
  } else if (value) {
    showValue = value;
  }
  return (
    <GenericAttribute
      label={label}
      testId={testId}
      onPress={onPress}
      disabled={disabled}
      showCaret={showCaret}
      showUnsyncIndicator={showUnsyncIndicator}>
      <ValueContainer>
        <ParagraphField value={showValue} />
      </ValueContainer>
    </GenericAttribute>
  );
};
export default TextAttribute;
