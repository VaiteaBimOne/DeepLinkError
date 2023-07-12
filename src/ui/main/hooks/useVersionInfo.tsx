import ConfigurationService from 'core/main/services/ConfigurationService';
import Monitoring from 'core/main/services/Monitoring';
import VersionInfoService from 'core/main/services/VersionInfoService';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import SpInAppUpdates, { AndroidStartUpdateOptions, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';

interface VersionInfoAction {
  update: () => Promise<void>;
  shouldUpdate: () => Promise<boolean>;
}
export interface VersionInfoHook {
  actions: VersionInfoAction;
}

const useVersionInfo = (): VersionInfoHook => {
  const { t } = useTranslation('update');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const isDev = ConfigurationService.areDeveloperOptionsEnabled();

  const inAppUpdate = useMemo(() => new SpInAppUpdates(isDev), [isDev]);

  const shouldUpdate = async () => {
    try {
      const response = await inAppUpdate.checkNeedsUpdate({ curVersion: VersionInfoService.getCurrentVersion() });
      return response.shouldUpdate;
    } catch (error) {
      Monitoring.trackError(error);
    }
    return false;
  };

  const update = useCallback(async () => {
    const createUpdateOptions = () => {
      const setAndroidSpecificOptions = () => {
        if (Platform.OS === 'android') {
          (updateOptions as AndroidStartUpdateOptions).updateType = IAUUpdateKind.FLEXIBLE;
        }
      };

      const updateOptions: StartUpdateOptions = {
        buttonCancelText: t('cancel'),
        buttonUpgradeText: t('update'),
        message: t('message'),
        title: t('title'),
      };

      setAndroidSpecificOptions();

      return updateOptions;
    };

    if (!isModalOpened) {
      try {
        const updateOptions: StartUpdateOptions = createUpdateOptions();
        await inAppUpdate.startUpdate(updateOptions);
        setIsModalOpened(true);
      } catch (error) {
        Monitoring.trackError(error);
      }
    }
  }, [inAppUpdate, isModalOpened, t]);

  return {
    actions: { shouldUpdate, update },
  };
};

export default useVersionInfo;
