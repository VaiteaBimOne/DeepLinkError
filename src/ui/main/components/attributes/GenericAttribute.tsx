import { useConnectivity } from 'core/connectivity/hooks/useConnectivity';
import React from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { CaretRight, SyncMobile } from 'ui/main/assets/icons';
import { normalize } from 'ui/main/utils/scalingUtils';
import Label from '../Label';

export interface DataProps {
  value?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface Props {
  children: React.ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  showCaret?: boolean;
  showUnsyncIndicator?: boolean;
  testId?: string;
  isTitle?: boolean;
}

const GenericAttribute: React.FunctionComponent<Props> = ({
  label,
  children,
  onPress,
  disabled,
  showCaret = true,
  testId,
  isTitle = false,
  showUnsyncIndicator,
}) => {
  const { isOnline } = useConnectivity();
  const theme = useTheme();
  return (
    <Container onPress={onPress} disabled={disabled} testID={testId} isTitle={isTitle}>
      <Column>
        {label && <StyledLabel>{label}</StyledLabel>}
        <DataContainer isTitle={isTitle}>{children}</DataContainer>
      </Column>
      <UnsyncContainer>
        {showUnsyncIndicator && !isOnline && (
          <View testID={`sync-icon-${label}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SyncMobile
              width={normalize(theme.metrics.iconSize[2])}
              height={theme.metrics.iconSize[2]}
              color={theme.colors.button.primary.background}
            />
          </View>
        )}
        {showCaret ? (
          <CaretRight
            width={theme.metrics.iconSize[3]}
            height={theme.metrics.iconSize[3]}
            color={disabled ? theme.colors.grey.light : theme.colors.black}
          />
        ) : (
          <View style={{ height: theme.metrics.iconSize[3], width: theme.metrics.iconSize[3] }}></View>
        )}
      </UnsyncContainer>
    </Container>
  );
};

export default GenericAttribute;

const UnsyncContainer = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

const Container = styled.TouchableOpacity<{ isTitle?: boolean }>`
  padding-top: ${(props) => (props.isTitle ? 0 : props.theme.metrics.spacing[3])}px;
  padding-bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledLabel = styled(Label)`
  color: ${(props) => props.theme.colors.grey.medium};
`;

const DataContainer = styled.View<{ isTitle?: boolean }>`
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: ${(props) => props.theme.metrics.spacing[3]}px;
  margin-top: ${(props) => (props.isTitle ? 0 : props.theme.metrics.spacing[1])}px;
`;

const Column = styled.View`
  flex-direction: column;
  margin-right: ${(props) => props.theme.metrics.iconSize[2]}px;
`;
