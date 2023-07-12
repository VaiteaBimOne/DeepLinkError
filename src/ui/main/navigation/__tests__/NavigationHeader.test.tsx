import { RenderAPI } from '@testing-library/react-native';
import { generateOneSubscriptionRealm } from '__mocks__/SubscriptionMock';
import { useSubscription } from 'core/subscription/hooks/useSubscription';
import React from 'react';
import { View } from 'react-native';
import { createRender } from 'ui/testUtils/renderUtils';
import NavigationHeader, { Props } from '../NavigationHeader';

jest.mock('core/subscription/hooks/useSubscription');
jest.mock('react-native-device-info', () => {
  return {
    isTablet: () => true,
  };
});

const A_TITLE = 'title';
const NODE_ID = 'node';
const A_NODE = <View testID='node' />;

const setup = (props: Props) => {
  const render = createRender({});
  return () => render(<NavigationHeader hubId={'1234'} {...props} />);
};
describe('NavigationHeader', () => {
  let render: () => RenderAPI;

  describe('given a title as props', () => {
    beforeEach(() => {
      render = setup({ title: A_TITLE });
      (useSubscription as jest.Mock).mockReturnValue({
        selectors: {
          isError: false,
          isLoading: false,
          subscription: generateOneSubscriptionRealm(),
        },
      });
    });
    it('should render the title', () => {
      const { getByText } = render();

      const title = getByText(A_TITLE);

      expect(title).toBeTruthy();
    });
  });

  describe('given a hubId with subscription', () => {
    beforeEach(() => {
      render = setup({ title: A_TITLE });
      (useSubscription as jest.Mock).mockReturnValue({
        selectors: {
          isError: false,
          isLoading: false,
          subscription: generateOneSubscriptionRealm(),
        },
      });
    });
    it('should render the top banner', () => {
      const { getByTestId } = render();

      const bannerVisible = getByTestId('subscription-banner');

      expect(bannerVisible).toBeTruthy();
    });
  });

  describe('given a iconLeft', () => {
    beforeEach(() => {
      render = setup({ iconLeft: A_NODE });
    });
    it('should render a left icon', () => {
      const { getByTestId } = render();

      const icon = getByTestId(NODE_ID);

      expect(icon).toBeTruthy();
    });
  });

  describe('given a navigationRight', () => {
    beforeEach(() => {
      render = setup({ iconRight: A_NODE });
    });
    it('should render a right navigation button', () => {
      const { getByTestId } = render();

      const navigationButton = getByTestId(NODE_ID);

      expect(navigationButton).toBeTruthy();
    });
  });
});
