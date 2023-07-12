import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Badge from '../Badge';
import Label from '../Label';
import GenericAttribute from './GenericAttribute';

const StyledBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  color: ${(props) => props.theme.colors.primary.primary};
`;

export interface Props {
  label?: string;
  badges?: string[];
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  showUnsyncIndicator?: boolean;
}

const BadgeAttribute: React.FunctionComponent<Props> = ({ label, badges = [], onPress, disabled, showCaret, showUnsyncIndicator }) => {
  const theme = useTheme();

  return (
    <GenericAttribute label={label} onPress={onPress} disabled={disabled} showCaret={showCaret} showUnsyncIndicator={showUnsyncIndicator}>
      {!badges.length && <Label variant={{ type: 'attribute' }}>-</Label>}
      {badges?.map((badge) => (
        <StyledBadge key={badge} colors={{ background: theme.colors.grey.lighter, text: theme.colors.primary.primary }} text={badge} />
      ))}
    </GenericAttribute>
  );
};

export default BadgeAttribute;
