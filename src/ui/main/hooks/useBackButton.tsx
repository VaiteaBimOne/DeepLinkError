import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackButton = (onBack?: () => void): void => {
  const handler = useCallback(() => {
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  }, [onBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};

export default useBackButton;
