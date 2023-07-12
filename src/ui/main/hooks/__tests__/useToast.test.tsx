import { RenderHookResult } from '@testing-library/react-hooks';
import { createRenderHook } from 'core/testUtils/hookUtils';
import { ToastProps } from 'ui/main/components/Toast';
import useToast, { ToastHook } from 'ui/main/hooks/useToast';

const A_LABEL = 'TEXT';

const showToastMock = jest.fn();

const setup = (props: ToastProps) => {
  return createRenderHook<ToastHook>(() => useToast(props), { toastContextProps: { showToast: showToastMock } });
};

describe('useToast', () => {
  let hook: RenderHookResult<unknown, ToastHook>;
  const onDismissMock = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    hook = setup({ onDismiss: onDismissMock, text: A_LABEL, type: 'success' });
  });

  describe('showToast', () => {
    it('should call showToast with the right params', () => {
      hook.result.current.actions.showToast();

      expect(showToastMock).toHaveBeenCalledWith({ onDismiss: onDismissMock, text: A_LABEL, type: 'success' });
    });
  });
});
