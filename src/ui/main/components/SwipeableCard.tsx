import React, { useState } from 'react';
import { StyleProp, ViewStyle, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';

export interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  renderActions: () => React.ReactNode;
  testID: string;
  containerStyle?: StyleProp<ViewStyle>;
  swipe?: () => void;
  unSwipe?: () => void;
  borderTop?: boolean;
}

const SwipeableCard: React.FunctionComponent<React.PropsWithoutRef<Props> & React.RefAttributes<Swipeable>> = React.forwardRef<Swipeable, Props>(
  ({ onPress, borderTop, children, renderActions, testID, containerStyle, swipe, unSwipe }, ref) => {
    const [isSwiped, setIsSwiped] = useState(false);
    const { colors } = useTheme();

    const forAttachment = testID.includes('attachment-item');
    return (
      <Swipeable
        ref={ref}
        containerStyle={[{ backgroundColor: colors.background.default }, containerStyle]}
        onSwipeableWillOpen={() => {
          setIsSwiped(true);
          swipe?.();
        }}
        onSwipeableWillClose={() => {
          setIsSwiped(false);
          unSwipe?.();
        }}
        renderRightActions={renderActions}
        overshootRight={false}
        useNativeAnimations>
        <StyledCard
          borderTop={borderTop}
          isSwiped={isSwiped}
          testID={testID}
          onPress={onPress}
          underlayColor={colors.underlayColors.dark}
          forAttachment={forAttachment}>
          {children}
        </StyledCard>
      </Swipeable>
    );
  },
);

const StyledCard = styled(TouchableHighlight)<{ isSwiped?: boolean; forAttachment: boolean; borderTop?: boolean }>`
  flex-direction: row;
  background-color: ${({ isSwiped, theme }) => (isSwiped ? theme.colors.grey.lighter : theme.colors.background.default)};
  border-bottom-width: ${({ forAttachment }) => (forAttachment ? '1px' : 0)};
  border-bottom-color: ${({ theme }) => theme.colors.grey.light};
  border-top-color: ${({ theme }) => theme.colors.grey.light};
  border-top-width: ${({ forAttachment, borderTop }) => (forAttachment && borderTop ? '1px' : 0)};
`;

export default React.memo(SwipeableCard);
