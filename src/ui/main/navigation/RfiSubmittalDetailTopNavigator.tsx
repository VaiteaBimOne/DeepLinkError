import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import Label from 'ui/main/components/Label';
import { normalize } from 'ui/main/utils/scalingUtils';
import theme from '../theme';
import { RfiDetailsScreenRouteParams, SubmittalsDetailsScreenRouteParams } from './AppContentStackNavigator';

type Props = MaterialTopTabBarProps & {
  route: RfiDetailsScreenRouteParams | SubmittalsDetailsScreenRouteParams;
  showTabNavigator: boolean;
};

const RfiSubmittalDetailTopNavigator: React.FunctionComponent<Props> = ({ state, descriptors, navigation, showTabNavigator }: Props) => {
  const {
    metrics: { spacing },
  } = useTheme();

  const { t } = useTranslation('rfis');

  const selectionButtonsHitSlop = { bottom: spacing[1], left: spacing[1], right: spacing[1] };

  return (
    <Container>
      {showTabNavigator && (
        <ScrollView horizontal={true}>
          <TabContainer>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  canPreventDefault: true,
                  target: route.key,
                  type: 'tabPress',
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate<any>({ merge: true, name: route.name });
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  target: route.key,
                  type: 'tabLongPress',
                });
              };
              return (
                <Tab
                  hitSlop={selectionButtonsHitSlop}
                  key={route.name}
                  accessibilityRole='button'
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <LabelContainer>
                    <Label
                      variant={{ type: 'h5' }}
                      style={{
                        color: isFocused ? theme.colors.pitchBlack : theme.colors.grey.medium,
                        textTransform: 'uppercase',
                      }}>
                      {t(`tabs.${route.name.toLowerCase()}`)}
                    </Label>
                  </LabelContainer>
                  {isFocused ? <Spotlight /> : <SpotlightTransparent />}
                </Tab>
              );
            })}
          </TabContainer>
        </ScrollView>
      )}
    </Container>
  );
};

export const TabContainer = styled.View`
  padding-left: ${(props) => props.theme.metrics.spacing[2]}px;
  flex-direction: row;
  align-items: center;
  margin-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
`;

export const LabelContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

export const Spotlight = styled.View`
  height: 2px;
  align-self: center;
  width: 22px;
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  border-radius: ${(props) => props.theme.metrics.borderRadius[1]};
  background-color: ${(props) => props.theme.colors.primary.primary};
`;

export const SpotlightTransparent = styled.View`
  height: 2px;
  align-self: center;
  margin-top: ${(props) => props.theme.metrics.spacing[1]}px;
  width: 22px;
  background-color: transparent;
`;

export const Tab = styled(TouchableOpacity)`
  padding-top: ${normalize(18)}px;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
  flex-wrap: nowrap;
`;

export const Container = styled(View)`
  border-bottom-color: ${(props) => props.theme.colors.grey.lightly};
  border-bottom-width: 1;
  margin-bottom: ${(props) => props.theme.metrics.spacing[2]}px;
`;

export default RfiSubmittalDetailTopNavigator;
