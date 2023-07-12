import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Banner, { BannerProps } from '../Banner';

const setup = (props: BannerProps) => {
  const render = createRender({});
  return () => render(<Banner {...props} />);
};

describe('Banner', () => {
  let render: () => RenderAPI;
  const TEXT = 'text';

  beforeEach(() => {
    render = setup({ text: TEXT, type: 'error' });
  });

  it('should display text', async () => {
    const { findByText } = render();

    const text = await findByText(TEXT);

    expect(text).toBeTruthy();
  });
  describe('when clicking on close button', () => {
    it('should close the banner', () => {
      const { getByTestId, queryByTestId } = render();

      const closeButton = getByTestId('close-btn');
      fireEvent(closeButton, 'onPress');
      const modal = queryByTestId('banner');

      expect(modal).toBeFalsy();
    });
  });

  describe('when passing a retryAction', () => {
    beforeEach(() => {
      render = setup({ onRetryAction: jest.fn(), text: TEXT, type: 'error' });
    });

    it('should render the retryAction button', () => {
      const { getByTestId } = render();

      const closeButton = getByTestId('retry-btn');

      expect(closeButton).toBeTruthy();
    });
  });
});
