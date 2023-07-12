import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useConnectivity } from 'core/connectivity/hooks/useConnectivity';
import RealmContext from 'core/main/persistence/RealmContext';
import useInitProject from 'core/projects/hooks/useInitProject';
import useProject from 'core/projects/state/hooks/useProject';
import { RfiSubmittalSortType, RfiSubmittalType } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import { useRfiSubmittalType } from 'core/rfiSubmittal/generic/hooks/useRfiSubmittalType';
import useInitApp from 'core/sync/hooks/useInitApp';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IssueFilterModalRef } from 'ui/issues/components/filters/IssueFiltersModal';
import NavigationHeader from 'ui/main/navigation/NavigationHeader';
import RfiSubmittalSortFilterIcons from 'ui/rfiSubmittal/generic/components/RfiSubmittalSortFilterIcons';
import RfiSubmittalFiltersModal from 'ui/rfiSubmittal/generic/components/filter/RfiSubmittalFiltersModal';
import RfisScreen from 'ui/rfiSubmittal/rfis/screens/RfisScreen';
import RfiSubmittalTopTabNavigator from './RfiSubmittalTopTabNavigator';
import LeaveProjectNavigationButton from './components/LeaveProjectNavigationButton';
import { ClosedKey, ForwardedKey, OpenKey, RfisTabKey } from './navigationKeys';

export type RfisStackParamsList = {
  [OpenKey]: { hubId: string; projectId: number; projectName: string; type: 'Open' };
  [ForwardedKey]: { hubId: string; projectId: number; projectName: string; type: 'Forwarded' };
  [ClosedKey]: { hubId: string; projectId: number; projectName: string; type: 'Closed' };
  [RfisTabKey]: {
    hubId: string;
    projectId: number;
    projectName: string;
    type: string;
    setError: (error: boolean) => void;
    setOffset: (offset: number) => void;
  };
};

interface Props {
  route: RfisStackRouteParams;
}
export const DESC_DIRECTION_RFIS = 'desc';
export const ASC_DIRECTION_RFIS = 'asc';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RfisStackParamsList>();

const RfisStackNavigator: React.FunctionComponent<Props> = ({ route }) => {
  const { t } = useTranslation('rfis');
  const [currentOffset, setCurrentOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);

  const [showTabar, setShowTabar] = useState(true);
  const theme = useTheme();

  const initPersistance = useInitApp();

  useEffect(() => {
    try {
      RealmContext.getPersistence();
    } catch (e: any) {
      initPersistance;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    params: { hubId, projectId },
  } = route;

  useInitProject({ hubId, onError: () => {}, projectId });

  const {
    selectors: { project },
  } = useProject({ hubId, projectId });

  const {
    actions: { changeType },
  } = useRfiSubmittalType();

  useEffect(() => {
    changeType(RfiSubmittalType.RFI);
  });

  const filtersModalRef = useRef<IssueFilterModalRef>(null);

  const { width, height } = Dimensions.get('window');

  const sortOptions = useMemo(() => {
    const sortFields = [
      {
        sortField: 'number',
        sortFieldLabel: 'number',
      },
      {
        sortField: 'dueDate',
        sortFieldLabel: 'dueDate',
      },
      {
        sortField: 'receivedDate',
        sortFieldLabel: 'receivedDate',
      },
    ];

    const options: { label: string; value: { order?: string; field: string } }[] = [];

    sortFields.forEach((value) => {
      options.push({
        label: `${t(`sort.${value.sortFieldLabel}`)}`,
        value: { field: value.sortField as RfiSubmittalSortType, order: ASC_DIRECTION_RFIS },
      });
      options.push({
        label: `${t(`sort.${value.sortFieldLabel}`)}`,
        value: { field: value.sortField as RfiSubmittalSortType, order: DESC_DIRECTION_RFIS },
      });
    });

    options.unshift({
      label: `${t(`sort.${'lastChanged'}`)}`,
      value: { field: 'modifiedOn', order: DESC_DIRECTION_RFIS },
    });

    return options;
  }, [t]);

  useEffect(() => {
    if (currentOffset < 0 || offset < 0) {
      setShowTabar(true);
      return;
    }

    if (offset > currentOffset && Math.abs(offset - currentOffset) > 10) {
      setShowTabar(false);
    } else if (offset < currentOffset && Math.abs(offset - currentOffset) > 10) {
      setShowTabar(true);
    }
    setCurrentOffset(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  const { isOnline } = useConnectivity();
  return (
    <>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background.default }, presentation: 'modal' }}>
        <Stack.Screen
          name={RfisTabKey}
          options={{
            animation: 'none',
            header: () => (
              <NavigationHeader
                hubId={hubId}
                list
                iconLeft={
                  <>
                    <LeaveProjectNavigationButton hubId={hubId} />
                  </>
                }
                iconRight={
                  !error && (
                    <RfiSubmittalSortFilterIcons
                      projectId={projectId}
                      onFilterPress={() => filtersModalRef.current?.open()}
                      sortOptions={sortOptions}
                    />
                  )
                }
                title={project?.name || t('rfis')}
              />
            ),
          }}
          children={() => (
            <Tab.Navigator
              initialLayout={{ height, width }}
              sceneContainerStyle={{ backgroundColor: theme.colors.background.default }}
              tabBar={(props) => <RfiSubmittalTopTabNavigator {...props} route={route} showTabar={showTabar && isOnline && !error} />}>
              <Tab.Screen
                key={OpenKey}
                name={OpenKey}
                component={RfisScreen}
                initialParams={{ ...route.params, setError, setOffset, type: 'Open' }}
              />
              <Tab.Screen
                key={ForwardedKey}
                name={ForwardedKey}
                component={RfisScreen}
                initialParams={{ ...route.params, setError, setOffset, type: 'Forwarded' }}
              />
              <Tab.Screen
                key={ClosedKey}
                name={ClosedKey}
                component={RfisScreen}
                initialParams={{ ...route.params, setError, setOffset, type: 'Closed' }}
              />
            </Tab.Navigator>
          )}
        />
      </Stack.Navigator>
      {!!project && route.params.projectId === project.id && (
        <RfiSubmittalFiltersModal hubId={hubId} title={t('filters.title')} ref={filtersModalRef} project={project} />
      )}
    </>
  );
};

// Screen Types
export type IssuesStackNavigationProp = NativeStackNavigationProp<RfisStackParamsList>;
export type OpenScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof OpenKey>;
export type ForwardedScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof ForwardedKey>;
export type ClosedScreenProp = NativeStackNavigationProp<RfisStackParamsList, typeof ClosedKey>;

// Route Types
export type RfisStackRouteParams = RouteProp<RfisStackParamsList, typeof RfisTabKey>;
export type OpenScreenRouteParams = RouteProp<RfisStackParamsList, typeof OpenKey>;
export type ForwardedScreenRouteParams = RouteProp<RfisStackParamsList, typeof ForwardedKey>;
export type ClosedScreenRouteParams = RouteProp<RfisStackParamsList, typeof ClosedKey>;

// All Stack
export default RfisStackNavigator;
