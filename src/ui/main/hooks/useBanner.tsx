import BannerContext from 'core/main/context/BannerContext';
import { useContext } from 'react';
import { BannerProps } from '../components/Banner';

interface BannerActions {
  showBanner: () => void;
}

export interface BannerHook {
  actions: BannerActions;
}

const useBanner = (props: BannerProps): BannerHook => {
  const { showBanner } = useContext(BannerContext);

  const handleShowBanner = () => showBanner(props);

  return {
    actions: {
      showBanner: handleShowBanner,
    },
  };
};

export default useBanner;
