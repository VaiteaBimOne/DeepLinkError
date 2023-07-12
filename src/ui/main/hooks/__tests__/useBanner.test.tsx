import { RenderHookResult } from '@testing-library/react-hooks';
import { createRenderHook } from 'core/testUtils/hookUtils';
import { BannerProps } from 'ui/main/components/Banner';
import useBanner, { BannerHook } from '../useBanner';

const A_LABEL = 'TEXT';

const showBannerMock = jest.fn();

const setup = (props: BannerProps) => {
  return createRenderHook<BannerHook>(() => useBanner(props), { bannerContextProps: { showBanner: showBannerMock } });
};

describe('useBanner', () => {
  let hook: RenderHookResult<unknown, BannerHook>;
  const onDismissMock = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    hook = setup({ onDismiss: onDismissMock, text: A_LABEL, type: 'error' });
  });

  describe('showBanner', () => {
    it('should call showBanner with the right params', () => {
      hook.result.current.actions.showBanner();

      expect(showBannerMock).toHaveBeenCalledWith({ onDismiss: onDismissMock, text: A_LABEL, type: 'error' });
    });
  });
});
