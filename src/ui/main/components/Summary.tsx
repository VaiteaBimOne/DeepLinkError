import { useConnectivity } from 'core/connectivity/hooks/useConnectivity';
import React from 'react';
import { View } from 'react-native';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled, { css, useTheme } from 'styled-components/native';
import { CaretRight, SyncMobile } from 'ui/main/assets/icons';
import Badge from 'ui/main/components/Badge';
import Label from 'ui/main/components/Label';
import { normalize } from '../utils/scalingUtils';

const Container = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
  padding-vertical: ${({ theme: { metrics } }) => metrics.spacing[3]}px;
`;

const Caret = styled(CaretRight)`
  margin-left: auto;
`;

const Title = styled(Label)<{ disabled?: boolean }>`
  margin-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.colors.grey.light};
    `}
`;

const SectionWithSeparator = styled.View<{ topBorder: boolean; bottomBorder: boolean }>`
  border-bottom-width: ${(props) => (props.bottomBorder ? 1 : 0)}px;
  border-bottom-color: ${(props) => props.theme.colors.grey.light};
  border-top-width: ${(props) => (props.topBorder ? 1 : 0)}px;
  border-top-color: ${(props) => props.theme.colors.grey.light};
`;

interface Props {
  onPress: () => void;
  testID?: string;
  Icon: React.FC<SvgProps>;
  title: string;
  badgeCount?: number;
  topBorder?: boolean;
  bottomBorder?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  unsyncData?: boolean;
}

const Summary: React.FunctionComponent<Props> = ({
  disabled,
  onPress,
  testID,
  Icon,
  title,
  badgeCount,
  topBorder = true,
  bottomBorder = true,
  style,
  unsyncData,
}) => {
  const theme = useTheme();
  const { isOnline } = useConnectivity();

  return (
    <SectionWithSeparator style={style} topBorder={topBorder} bottomBorder={bottomBorder}>
      <Container onPress={onPress} testID={testID} disabled={disabled}>
        <Icon
          height={theme.metrics.iconSize[3]}
          width={theme.metrics.iconSize[3]}
          color={disabled ? theme.colors.grey.light : theme.colors.grey.dark}
        />
        <Title disabled={disabled}>{title}</Title>
        {badgeCount !== undefined && (
          <Badge text={badgeCount} colors={{ background: theme.colors.grey.lighter, text: theme.colors.primary.primary }} />
        )}

        <UnsyncContainer style={{ flexDirection: 'row', marginLeft: 'auto' }}>
          {unsyncData && !isOnline && (
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <SyncMobile
                width={normalize(theme.metrics.iconSize[2])}
                height={theme.metrics.iconSize[2]}
                color={theme.colors.button.primary.background}
              />
            </View>
          )}
          <Caret
            height={theme.metrics.iconSize[3]}
            width={theme.metrics.iconSize[3]}
            color={disabled ? theme.colors.grey.light : theme.colors.grey.dark}
          />
        </UnsyncContainer>
      </Container>
    </SectionWithSeparator>
  );
};

const UnsyncContainer = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

export default Summary;
