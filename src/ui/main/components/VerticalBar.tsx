import React from 'react';
import styled from 'styled-components/native';
import { normalize } from '../utils/scalingUtils';

type Props = {
  color: string;
  testID?: string;
};

const Bar = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  width: ${normalize(4)}px;
  border-radius: ${(props) => props.theme.metrics.borderRadius[3]}px;
  height: 100%;
`;

export const VerticalBar: React.FunctionComponent<Props> = ({ color, testID }) => {
  return <Bar color={color} testID={testID} />;
};
