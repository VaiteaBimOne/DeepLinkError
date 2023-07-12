import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import BadgeAttribute, { Props } from '../BadgeAttribute';

const A_LABEL = 'LABEL';
const BADGES = ['Badge #1', 'Badge #2'];

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<BadgeAttribute {...props} />);
};

describe('AvatarAttribute', () => {
  let render: () => RenderAPI;

  describe('when a label is provided', () => {
    beforeEach(() => {
      render = setup({
        label: A_LABEL,
      });
    });

    it('should display the label', () => {
      const { getByText } = render();

      const component = getByText(A_LABEL);

      expect(component).toBeTruthy();
    });
  });

  describe('when no badge is provided', () => {
    beforeEach(() => {
      render = setup({
        label: A_LABEL,
      });
    });

    it('should display the - placeholder', () => {
      const { getByText } = render();

      const component = getByText('-');

      expect(component).toBeTruthy();
    });
  });

  describe('when badges are provided', () => {
    beforeEach(() => {
      render = setup({
        badges: BADGES,
        label: A_LABEL,
      });
    });

    it('should display the badges', () => {
      const { getByText } = render();

      const firstBadge = getByText(BADGES[0]);
      const secondBadge = getByText(BADGES[1]);

      expect(firstBadge).toBeTruthy();
      expect(secondBadge).toBeTruthy();
    });
  });
});
