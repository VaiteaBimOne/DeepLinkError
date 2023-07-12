import React from 'react';
import styled from 'styled-components/native';
import Avatar from '../Avatar';
import Label from '../Label';
import GenericAttribute from './GenericAttribute';

export interface DataProps {
  value?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface Props {
  data?: DataProps[];
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  showUnsyncIndicator?: boolean;
}

const AvatarAttribute: React.FunctionComponent<Props> = ({ showUnsyncIndicator, label, data = [], onPress, disabled, showCaret }) => (
  <GenericAttribute label={label} onPress={onPress} disabled={disabled} showCaret={showCaret} showUnsyncIndicator={showUnsyncIndicator}>
    <>
      {!data.length && (
        <ValueContainer>
          <Label variant={{ type: 'attribute' }}>-</Label>
        </ValueContainer>
      )}

      {data.map((item) => (
        <ValueContainer key={item.value || ''}>
          {(!!item.avatarUrl || !!item.initials) && <Avatar uri={item.avatarUrl} placeholderText={item.initials} />}
          <StyledLabel variant={{ type: 'attribute' }}>{item.value || '-'}</StyledLabel>
        </ValueContainer>
      ))}
    </>
  </GenericAttribute>
);

export default AvatarAttribute;

const StyledLabel = styled(Label)`
  margin-left: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const ValueContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-right: ${(props) => props.theme.metrics.spacing[3]}px;
`;
