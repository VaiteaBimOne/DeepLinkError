import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { KeyboardAvoidingView, Platform, KeyboardAvoidingViewProps } from 'react-native';

export interface Props extends KeyboardAvoidingViewProps {
  offset?: number;
}

const KeyboardAvoidingContainer: React.FC<Props> = ({ children, offset = 0, ...props }) => {
  const headerHeight = useHeaderHeight();

  const keyboardVerticalOffset = headerHeight + offset;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;
