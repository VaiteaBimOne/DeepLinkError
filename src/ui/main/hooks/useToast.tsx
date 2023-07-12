import ToastContext from 'core/main/context/ToastContext';
import { useCallback, useContext } from 'react';
import { ToastProps } from 'ui/main/components/Toast';

interface ToastActions {
  showToast: () => void;
}

export interface ToastHook {
  actions: ToastActions;
}

const useToast = (props: ToastProps): ToastHook => {
  const { showToast } = useContext(ToastContext);

  const handleShowToast = useCallback(() => showToast(props), [props, showToast]);

  return {
    actions: {
      showToast: handleShowToast,
    },
  };
};

export default useToast;
