import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, TouchableOpacity, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import Label from 'ui/main/components/Label';
import { normalize } from 'ui/main/utils/scalingUtils';
import ActiveSearch from 'ui/rfiSubmittal/rfis/components/ActiveSearch';
import { RfisStackRouteParams } from './RfisStackNavigator';
import { SubmittalsStackRouteParams } from './SubmittalsStackNavigator';

type Props = MaterialTopTabBarProps & {
  route: RfisStackRouteParams | SubmittalsStackRouteParams;
  showTabar: boolean;
};

interface PropsTab {
  isFocused: boolean;
}

const HEIGHT_UP = 10;
const HEIGHT_DOWN = !isTablet() ? 100 : 190;

const RfiSubmittalTopTabNavigator: React.FunctionComponent<Props> = ({ route, state, descriptors, navigation, showTabar }: Props) => {
  const {
    metrics: { spacing },
  } = useTheme();

  const heightRA = useSharedValue(HEIGHT_DOWN);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: heightRA.value,
    };
  });

  const { t } = useTranslation('rfis');

  const { projectId } = route.params;

  const selectionButtonsHitSlop = { bottom: spacing[1], left: spacing[1], right: spacing[1] };

  useEffect(() => {
    // Prevent unnecessary animation
    if ((!showTabar && heightRA.value == HEIGHT_UP) || (showTabar && heightRA.value == HEIGHT_DOWN)) {
      return;
    }

    if (!showTabar) {
      heightRA.value = withTiming(HEIGHT_UP, {
        duration: 400,
        easing: Easing.inOut(Easing.exp),
      });
    } else if (showTabar) {
      heightRA.value = withTiming(HEIGHT_DOWN, {
        duration: 400,
        easing: Easing.inOut(Easing.exp),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTabar]);

  return (
    <Animated.View style={[animatedStyles]}>
      <ActiveSearchContainer>
        <ActiveSearch projectId={projectId} />
      </ActiveSearchContainer>
      <View>
        <View>
          {
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
                    style={{
                      ...Platform.select({
                        android: {
                          elevation: isFocused ? 4 : 0,
                        },
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: {
                            height: 1,
                            width: 0,
                          },
                          shadowOpacity: isFocused ? 0.2 : 0,
                          shadowRadius: isFocused ? 2.5 : 0,
                        },
                      }),
                    }}
                    hitSlop={selectionButtonsHitSlop}
                    key={route.name}
                    accessibilityRole='button'
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    isFocused={isFocused}
                    onPress={onPress}
                    onLongPress={onLongPress}>
                    <LabelContainer>
                      <Label variant={{ type: 'body' }} style={{ textAlign: 'center' }}>
                        {t(`tabs.${route.name}`)}
                      </Label>
                    </LabelContainer>
                  </Tab>
                );
              })}
            </TabContainer>
          }
        </View>
      </View>
    </Animated.View>
  );
};

export const ActiveSearchContainer = styled.View`
  margin-horizontal: ${normalize(24)};
  margin-top: ${normalize(16)};
  zindex: 9;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  margin-horizontal: ${normalize(26)};
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.grey.lighter};
  border-radius: ${normalize(12)}px;
  margin-top: ${(props) => props.theme.metrics.spacing[2]};

  height: ${normalize(24)}px;
`;

export const LabelContainer = styled.View`
  flex-direction: column;
  width: 100%;
  border-radius: ${normalize(12)}px;
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
  margin-left: ${(props) => props.theme.metrics.spacing[1]}px;
  align-items: center;
  justify-content: center;
`;

export const Tab = styled(TouchableOpacity)`
  padding-right: ${(props) => props.theme.metrics.spacing[2]}px;
  margin-left: ${normalize(2)}px;
  margin-right: ${normalize(2)}px;
  height: ${normalize(20)}px;
  flex-wrap: nowrap;
  border-radius: ${normalize(12)}px;
  background-color: ${(props: PropsTab) => (props.isFocused ? 'white' : 'transparent')};
  flex: 1;
`;

export default RfiSubmittalTopTabNavigator;
