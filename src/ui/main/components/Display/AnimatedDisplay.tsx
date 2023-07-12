import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'styled-components/native';
import { Animations } from 'ui/main/components/Display/Animations';
import usePrevious from 'ui/main/hooks/usePrevious';

const DEFAULT_DURATION = 250;

const DEFAULT_ENTER = 'fadeIn';
const DEFAULT_EXIT = 'fadeOut';

export interface Props {
  visible?: boolean;
  enterDuration?: number;
  exitDuration?: number;
  exit?: Animations;
  enter?: Animations;
}

interface EndState {
  finished: boolean;
}

type ContainerRef = {
  [K in Animations]?: (duration?: number | undefined) => Promise<{ finished: boolean }>;
} & Component;

const AnimatedDisplay: React.FunctionComponent<Props> = ({
  visible,
  enterDuration = DEFAULT_DURATION,
  exitDuration = DEFAULT_DURATION,
  exit = DEFAULT_ENTER,
  enter = DEFAULT_EXIT,
  children,
}: React.PropsWithChildren<Props>) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const previousVisible = usePrevious<boolean>(visible ? visible : false);

  const ref = useRef<ContainerRef>(null);

  const theme = useTheme();

  const onAnimationEnd = useCallback((endState: EndState) => {
    if (endState.finished) {
      setShouldRender(false);
    }
  }, []);

  useEffect(() => {
    if (visible !== previousVisible) {
      if (!visible) {
        ref.current?.[exit]?.(exitDuration).then((endState: EndState) => onAnimationEnd(endState));
      }

      if (visible) {
        setShouldRender(visible);
        ref.current?.[enter]?.(enterDuration);
      }
    }
  }, [visible, enter, enterDuration, exit, exitDuration, onAnimationEnd, previousVisible]);

  return (
    <Animatable.View
      useNativeDriver
      ref={ref}
      style={
        shouldRender
          ? {}
          : {
              height: 0,
              left: theme.metrics.window.width,
              position: 'absolute',
              top: theme.metrics.window.height,
              width: 0,
            }
      }>
      {shouldRender ? children : undefined}
    </Animatable.View>
  );
};

export default AnimatedDisplay;
