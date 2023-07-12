import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Linking, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { IOS_STORE_LINK, PLAY_STORE_LINK } from '../utils/appVersionUtils';

interface Props {
  setShowUpdateWarningModal(visible: boolean): void;
}

interface UpdateAction {
  cancelAction: () => void;
  openStore: () => void;
}

export interface UpdateHook {
  actions: UpdateAction;
}

const useUpdateVersion = ({ setShowUpdateWarningModal }: Props): UpdateHook => {
  const [latestVersion, setLatestVersion] = useState('');

  const getLastVersionDeclined = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('lastVersionDeclined');
  };

  const processToShowUpdateModal = async (latestVersion: string, actualVersion: string) => {
    const lastUpdateDeclined = await getLastVersionDeclined();

    if (lastUpdateDeclined && lastUpdateDeclined === latestVersion) {
      setShowUpdateWarningModal(false);
    } else if (actualVersion && actualVersion < latestVersion) {
      setShowUpdateWarningModal(true);
    }
  };

  const cancelAction = async () => {
    await AsyncStorage.setItem('lastVersionDeclined', latestVersion);
    setShowUpdateWarningModal(false);
  };

  const openStore = () => {
    if (Platform.OS === 'ios') {
      const link = IOS_STORE_LINK;
      Linking.canOpenURL(link).then((supported) => {
        supported && Linking.openURL(link);
      });
    } else {
      Linking.openURL(PLAY_STORE_LINK);
    }
  };

  // Execution
  if (latestVersion.length === 0) {
    const actualVersion = VersionCheck.getCurrentVersion();
    VersionCheck.getLatestVersion({
      provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
    }).then(async (latestVersion) => {
      if (!latestVersion) {
        return;
      }
      if (latestVersion.length > 0) {
        await processToShowUpdateModal(latestVersion, actualVersion);
      }
      setLatestVersion(latestVersion);
    });
  }

  return {
    actions: {
      cancelAction,
      openStore,
    },
  };
};

export default useUpdateVersion;
