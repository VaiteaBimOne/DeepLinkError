import React from 'react';
import styled from 'styled-components/native';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

interface Props {
  label: string;
}

const Tag: React.FC<Props> = ({ label }) => {
  return (
    <NewOptionWrapper testID='new-option' style={{ justifyContent: 'center' }}>
      <Label variant={{ type: 'selectLabelOption' }} style={{ fontWeight: '800' }}>
        {label}
      </Label>
    </NewOptionWrapper>
  );
};

const NewOptionWrapper = styled.View`
  height: ${normalize(24)}px;
  min-width: ${normalize(18)}px;
  background-color: #f6f6f6;
  margin-left: ${normalize(4)}px;
  border-radius: 3px;
  padding-horizontal: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export default Tag;
