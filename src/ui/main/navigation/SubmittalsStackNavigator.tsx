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
import SubmittalScreen from 'ui/rfiSubmittal/submittals/screens/SubmittalScreen';
import RfiSubmittalTopTabNavigator from './RfiSubmittalTopTabNavigator';
import LeaveProjectNavigationButton from './components/LeaveProjectNavigationButton';
import { ClosedKey, ForwardedKey, OpenKey, SubmittalsTabKey } from './navigationKeys';

export type SubmittalsStackParamsList = {
  [OpenKey]: { hubId: string; projectId: number; projectName: string; type: 'Open' };
  [ForwardedKey]: { hubId: string; projectId: number; projectName: string; type: 'Forwarded' };
  [ClosedKey]: { hubId: string; projectId: number; projectName: string; type: 'Closed' };
  [SubmittalsTabKey]: {
    hubId: string;
    projectId: number;
    projectName: string;
    type: string;
    setError: (error: boolean) => void;
    setOffset: (offset: number) => void;
  };
};

interface Props {
  route: SubmittalsStackRouteParams;
}
export const DESC_DIRECTION = 'desc';
export const ASC_DIRECTION = 'asc';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<SubmittalsStackParamsList>();

const SubmittalsStackNavigator: React.FunctionComponent<Props> = ({ route }) => {
  const { t } = useTranslation('rfis');
  const [currentOffset, setCurrentOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [showTabar, setShowTabar] = useState(true);

  const theme = useTheme();
  const [error, setError] = useState(false);

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
    changeType(RfiSubmittalType.SUBMITTAL);
  });

  const filtersModalRef = useRef<IssueFilterModalRef>(null);
  const { isOnline } = useConnectivity();
  const { width, height } = Dimensions.get('window');

  const sortOptions = useMemo(() => {
    const sortFields = [
      {
        sortField: 'number',
        sortFieldLabel: 'numberSubmittal',
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
        value: { field: value.sortField as RfiSubmittalSortType, order: ASC_DIRECTION },
      });
      options.push({
        label: `${t(`sort.${value.sortFieldLabel}`)}`,
        value: { field: value.sortField as RfiSubmittalSortType, order: DESC_DIRECTION },
      });
    });

    options.unshift({
      label: `${t(`sort.${'lastChanged'}`)}`,
      value: { field: 'modifiedOn', order: DESC_DIRECTION },
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

  return (
    <>
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors.background.default }, presentation: 'modal' }}>
        <Stack.Screen
          name={SubmittalsTabKey}
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
                title={project?.name || t('submittals')}
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
                component={SubmittalScreen}
                initialParams={{ ...route.params, setError, setOffset, type: 'Open' }}
              />
              <Tab.Screen
                key={ForwardedKey}
                name={ForwardedKey}
                component={SubmittalScreen}
                initialParams={{ ...route.params, setError, setOffset, type: 'Forwarded' }}
              />
              <Tab.Screen
                key={ClosedKey}
                name={ClosedKey}
                component={SubmittalScreen}
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
export type IssuesStackNavigationProp = NativeStackNavigationProp<SubmittalsStackParamsList>;
export type OpenScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof OpenKey>;
export type ForwardedScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof ForwardedKey>;
export type ClosedScreenProp = NativeStackNavigationProp<SubmittalsStackParamsList, typeof ClosedKey>;

// Route Types
export type SubmittalsStackRouteParams = RouteProp<SubmittalsStackParamsList, typeof SubmittalsTabKey>;
export type OpenScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof OpenKey>;
export type ForwardedScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof ForwardedKey>;
export type ClosedScreenRouteParams = RouteProp<SubmittalsStackParamsList, typeof ClosedKey>;

// All Stack
export default SubmittalsStackNavigator;
