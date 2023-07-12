import React from 'react';
import styled from 'styled-components/native';
import { normalize } from '../../utils/scalingUtils';

const DrawerHandle = styled.View`
  background-color: ${(props) => props.theme.colors.grey.light};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  height: ${normalize(3)}px;
  margin-bottom: ${(props) => props.theme.metrics.spacing[3]}px;
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  width: ${normalize(40)}px;
`;

export default React.memo(DrawerHandle);
