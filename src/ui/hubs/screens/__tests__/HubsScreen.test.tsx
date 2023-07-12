import { RenderAPI } from '@testing-library/react-native';
import { mockHubListItemWithImage } from '__mocks__/hubMock';
import { EventBus } from 'core/eventBus/hooks/useEventBus';
import { HubList } from 'core/hubs/domain/HubList';
import HubsController from 'core/hubs/services/api/HubsController';
import React from 'react';
import { createNavigationMock } from 'ui/testUtils/navigationMock';
import { createRender } from 'ui/testUtils/renderUtils';
import HubsScreen from '../HubsScreen';

jest.mock('react-native-gainsight-px', () => ({}));

jest.mock('ui/main/hooks/useUpdateVersion.tsx', () =>
  jest.fn().mockReturnValue({
    actions: {
      cancelAction: () => jest.fn(),
      openStore: () => jest.fn(),
    },
  }),
);

jest.mock('launchdarkly-react-native-client-sdk', () => {
  return jest.fn().mockImplementation(() => {
    return { InitLaunchDarkly: jest.fn() };
  });
});

const setup = () => {
  const render = createRender({});
  return () => render(<HubsScreen navigation={createNavigationMock()} />);
};

describe('HubsScreen', () => {
  const hub1 = mockHubListItemWithImage();
  const hub2 = mockHubListItemWithImage();

  describe('when the hubs are loaded', () => {
    let render: () => RenderAPI;

    beforeEach(() => {
      jest.spyOn(HubsController, 'getAll').mockResolvedValue(new HubList([hub1, hub2]));

      render = setup();
    });

    it('should display hubs list', async () => {
      const { findAllByTestId } = render();
      EventBus.getInstance().dispatch('launchDarklyInitialized');

      setTimeout(async () => {
        const hubs = await findAllByTestId('item-card');

        expect(hubs).toHaveLength(2);
      }, 3000);
    });
  });

  describe('when the hubs are empty', () => {
    let render: () => RenderAPI;

    beforeEach(() => {
      jest.spyOn(HubsController, 'getAll').mockResolvedValue(new HubList());

      render = setup();
    });

    it('should display an empty state', async () => {
      const { findByTestId } = render();

      setTimeout(async () => {
        const emptyState = await findByTestId('empty-state');

        expect(emptyState).toBeTruthy();
      }, 3000);
    });
  });

  describe('when the hubs are loading', () => {
    let render: () => RenderAPI;

    beforeEach(() => {
      jest.spyOn(HubsController, 'getAll').mockResolvedValue(new Promise(() => undefined));

      render = setup();
    });

    it('should display loading status', async () => {
      const { findByTestId } = render();

      const hubs = await findByTestId('card-list-skeleton');

      expect(hubs).toBeTruthy();
    });
  });

  describe('when there is an error', () => {
    let render: () => RenderAPI;

    beforeEach(() => {
      jest.spyOn(HubsController, 'getAll').mockRejectedValue({});

      render = setup();
    });

    it('should display error state', async () => {
      const { findByText } = render();

      setTimeout(async () => {
        const errorMessage = await findByText('Unable to load hubs list');

        expect(errorMessage).toBeTruthy();
      }, 3000);
    });

    it('should display a banner with error message', async () => {
      const { findByTestId } = render();

      const errorBanner = await findByTestId('banner-message');

      expect(errorBanner).toBeTruthy();
    });
  });
});
