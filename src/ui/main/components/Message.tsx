import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { CloseCircle, Info } from '../assets/icons';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

const Container = styled.View<{ color: string }>`
  border-radius: ${(props) => props.theme.metrics.borderRadius[1]}px;
  background-color: ${(props) => props.color};
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled(Label)`
  flex: 1;
  color: ${(props) => props.theme.colors.black};
`;

const LeftIcon = styled.View`
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export interface MessageProps {
  type: MessageType;
  text: string;
}

type MessageType = 'warning' | 'error';

const Message: React.FunctionComponent<MessageProps> = ({ type, text }) => {
  const theme = useTheme();

  return (
    <Container color={theme.colors[type].lighter}>
      <LeftIcon>
        {type === 'error' && <CloseCircle color={theme.colors.error.dark} height={normalize(25)} width={normalize(30)} />}
        {type === 'warning' && <Info color={theme.colors.warning.dark} height={normalize(25)} width={normalize(30)} />}
      </LeftIcon>
      <Content variant={{ type: 'body' }} testID='message-content'>
        {text}
      </Content>
    </Container>
  );
};

export default Message;
