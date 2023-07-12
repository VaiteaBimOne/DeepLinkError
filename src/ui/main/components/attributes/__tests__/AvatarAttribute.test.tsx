import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import AvatarAttribute, { Props } from '../AvatarAttribute';

const A_LABEL = 'LABEL';
const A_VALUE = 'Value';
const AN_AVATAR_URL = 'https://a3-images.myspacecdn.com/images03/26/d34ec8b4c5204d75b74bb1af942c8352/300x300.jpg';

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<AvatarAttribute {...props} />);
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

  describe('when an avatar is provided', () => {
    beforeEach(() => {
      render = setup({
        data: [{ avatarUrl: AN_AVATAR_URL, value: A_VALUE }],
        label: A_LABEL,
      });
    });

    it('should display the avatar', () => {
      const { getByTestId } = render();

      const component = getByTestId('avatar');

      expect(component).toBeTruthy();
    });
  });

  describe('when an avatar is not provided but initials are', () => {
    beforeEach(() => {
      render = setup({
        data: [{ initials: 'GR', value: A_VALUE }],
        label: A_LABEL,
      });
    });

    it('should display the initials', () => {
      const { getByTestId } = render();

      const component = getByTestId('placeholder');

      expect(component).toBeTruthy();
    });
  });

  describe('when data is empty', () => {
    beforeEach(() => {
      render = setup({ label: A_LABEL });
    });

    it('should display the - placeholder', () => {
      const { getByText } = render();

      const component = getByText('-');

      expect(component).toBeTruthy();
    });
  });
});
