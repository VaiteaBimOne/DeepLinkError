import React, { useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
`;

interface Props {
  children: React.ReactNode;
  parentRef?: React.RefObject<any>;
}

export interface FocusableViewRef {
  focus: () => void;
}

const ScrollOnFocusView: React.FunctionComponent<React.PropsWithoutRef<Props> & React.RefAttributes<FocusableViewRef>> = React.forwardRef<
  FocusableViewRef,
  Props
>(({ children, parentRef }, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (parentRef?.current) {
        viewRef.current?.measureLayout(
          parentRef.current,
          (_x, y) => parentRef?.current?.scrollTo({ y }),
          () => {},
        );
      }
    },
  }));

  const viewRef = useRef<View>(null);

  return <Container ref={viewRef}>{children}</Container>;
});

export default ScrollOnFocusView;
