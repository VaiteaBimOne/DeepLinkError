import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Avatar, { Props } from '../Avatar';

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<Avatar {...props} />);
};

describe('Avatar', () => {
  let render: () => RenderAPI;

  describe('when uri is present', () => {
    beforeEach(() => {
      render = setup({ uri: 'https://a3-images.myspacecdn.com/images03/26/d34ec8b4c5204d75b74bb1af942c8352/300x300.jpg' });
    });

    it('should render the image', () => {
      const { getByTestId } = render();

      const component = getByTestId('avatar');

      expect(component).toBeTruthy();
    });
  });

  describe('when no uri is present', () => {
    describe('when placeholder is present', () => {
      beforeEach(() => {
        render = setup({ placeholderText: 'VB' });
      });

      it('should render the placeholder', () => {
        const { getByTestId } = render();

        const component = getByTestId('placeholder-text');

        expect(component).toBeTruthy();
      });
    });
    describe('when no placeholder is present', () => {
      beforeEach(() => {
        render = setup({});
      });

      it('should render the placeholder', () => {
        const { getByTestId } = render();

        const component = getByTestId('placeholder-icon');

        expect(component).toBeTruthy();
      });
    });
  });
});
