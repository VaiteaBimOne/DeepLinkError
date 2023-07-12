import React from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { normalize } from '../../utils/scalingUtils';
import Label from '../Label';

const StyledSubText = styled(Label)`
  color: ${(props) => props.theme.colors.grey.medium};
  text-align: center;
`;

const StyledText = styled(Label)`
  text-align: center;
`;

const BlankSlateContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
  padding-left: ${(props) => props.theme.metrics.spacing[3]}px;
`;

const RefreshButton = styled(Label)`
  padding-top: ${(props) => props.theme.metrics.spacing[3]}px;
`;

interface Props {
  SvgImage: React.FC<SvgProps>;
  text?: string;
  subText?: string;
  actionLabel?: string;
  actionOnPress?: () => void;
  testID?: string;
  color?: string;
}

const EmptySlate: React.FC<Props> = ({ SvgImage, text, color, subText, actionLabel, actionOnPress, testID }) => {
  return (
    <BlankSlateContainer testID={testID || 'empty-state'}>
      <SvgImage color={color} width={normalize(100)} height={normalize(100)} />
      {text && <StyledText variant={{ type: 'h3' }}>{text}</StyledText>}
      {subText && <StyledSubText variant={{ type: 'h4' }}>{subText}</StyledSubText>}
      {actionLabel && (
        <RefreshButton variant={{ type: 'link' }} onPress={() => actionOnPress?.()}>
          {actionLabel}
        </RefreshButton>
      )}
    </BlankSlateContainer>
  );
};

export default EmptySlate;
