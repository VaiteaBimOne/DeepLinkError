import React from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import fonts from 'ui/main/theme/fonts';

export type LabelVariant = {
  type: keyof typeof fonts.text;
  alignment?: 'center' | 'left';
};

interface StyleProps {
  variant: LabelVariant;
}

const StyledText = styled.Text<StyleProps>`
  ${(props) => props.theme.fonts.text[props.variant.type][props.variant.alignment ?? 'center']};
`;

interface Props {
  children: React.ReactNode;
  variant?: LabelVariant;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
  onPress?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}

const Label: React.FunctionComponent<Props> = ({
  children,
  style,
  variant = { type: 'body' },
  testID,
  onPress,
  numberOfLines,
  adjustsFontSizeToFit = false,
  onLayout,
  ellipsizeMode = 'tail',
}) => {
  const { metrics } = useTheme();
  const LabelComponent = (
    <StyledText
      onLayout={onLayout}
      style={style}
      variant={variant}
      testID={testID}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}>
      {children}
    </StyledText>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={style}
        hitSlop={{ bottom: metrics.hitSlop[1], left: metrics.hitSlop[1], right: metrics.hitSlop[1], top: metrics.hitSlop[1] }}
        onPress={onPress}>
        {LabelComponent}
      </TouchableOpacity>
    );
  }

  return LabelComponent;
};

export default Label;
