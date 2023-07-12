import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from 'ui/main/utils/scalingUtils';

interface Props {
  focused: boolean;
  Icon: React.FC<SvgProps>;
  FocusIcon: React.FC<SvgProps>;
  testID?: string;
  iconStyle?: StyleProp<ViewStyle>;
}

const TabIcon: React.FunctionComponent<Props> = ({ focused, Icon, FocusIcon, testID, iconStyle }) => {
  const {
    colors,
    metrics: { iconSize },
  } = useTheme();
  return (
    <StyledIconContainer testID={testID}>
      <Spacer />
      {focused ? (
        <FocusIcon style={iconStyle} height={iconSize[4]} width={iconSize[4]} color={colors.primary.primary} />
      ) : (
        <Icon style={iconStyle} height={iconSize[4]} width={iconSize[4]} color={colors.black} />
      )}
    </StyledIconContainer>
  );
};

const StyledIconContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-around;
`;

const Spacer = styled.View`
  height: ${normalize(5)}px;
`;

export default TabIcon;
