import LoadingContext from 'core/main/context/LoadingContext';
import { useContext } from 'react';

interface AnimatedLoadingActions {
  showAnimatedLoading: () => void;
  hideAnimatedLoading: () => void;
}

export interface AnimatedLoadingHook {
  actions: AnimatedLoadingActions;
}

export interface AnimatedLoadingProps {
  text: string;
}

const useAnimatedLoading = ({ text }: AnimatedLoadingProps): AnimatedLoadingHook => {
  const { showAnimatedLoading, hideAnimatedLoading } = useContext(LoadingContext);

  const handleShow = () => showAnimatedLoading(text);

  return {
    actions: {
      hideAnimatedLoading,
      showAnimatedLoading: handleShow,
    },
  };
};

export default useAnimatedLoading;
