import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import Toast, { ToastProps } from 'ui/main/components/Toast';
import { createRender } from 'ui/testUtils/renderUtils';

const setup = (props: ToastProps) => {
  const render = createRender({});
  return () => render(<Toast {...props} />);
};

describe('Toast', () => {
  let render: () => RenderAPI;
  const TEXT = 'text';

  beforeEach(() => {
    render = setup({ text: TEXT, type: 'success' });
  });

  it('should display text', async () => {
    const { findByText } = render();

    const text = await findByText(TEXT);

    expect(text).toBeTruthy();
  });
  describe('when clicking on close button', () => {
    it('should close the toast', () => {
      const { getByTestId, queryByTestId } = render();

      const closeButton = getByTestId('close-btn');
      fireEvent(closeButton, 'onPress');
      const modal = queryByTestId('toast');

      expect(modal).toBeFalsy();
    });
  });
});
