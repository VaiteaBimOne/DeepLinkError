import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { CaretLeft } from 'ui/main/assets/icons';
import { createRender } from 'ui/testUtils/renderUtils';
import Badge from '../Badge';

const TEXT = 'text';

const setup = (icon?: React.ReactNode) => {
  const render = createRender({});
  return () => render(<Badge text={TEXT} icon={icon} />);
};

describe('Badge', () => {
  let render: (onPress?: () => void) => RenderAPI;

  beforeEach(() => {
    render = setup();
  });

  it('should render the text', () => {
    const { getByText } = render();

    const text = getByText(TEXT);

    expect(text).toBeTruthy();
  });
  describe('when passing a icon node', () => {
    beforeEach(() => {
      render = setup(<CaretLeft />);
    });

    it('should render the icon', () => {
      const { getByTestId } = render();

      const icon = getByTestId('badge-icon');

      expect(icon).toBeTruthy();
    });
  });
});
