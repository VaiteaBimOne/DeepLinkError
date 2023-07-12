import React from 'react';
import styled from 'styled-components/native';
import StatusBadge from 'ui/issues/components/StatusBadge';
import GenericAttribute from './GenericAttribute';

type NullableString = string | undefined | null;

interface Props {
  value?: NullableString;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  testId?: string;
  color?: string;
}

const StatusAttribute: React.FunctionComponent<Props> = ({ value, onPress, disabled, testId, color }) => {
  return (
    <GenericAttribute testId={testId} onPress={onPress} disabled={disabled} showCaret={false} isTitle>
      <ValueContainer>
        <StatusBadge text={value} color={color} />
      </ValueContainer>
    </GenericAttribute>
  );
};

export default StatusAttribute;

const ValueContainer = styled.View`
  flex-direction: row;
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
`;
