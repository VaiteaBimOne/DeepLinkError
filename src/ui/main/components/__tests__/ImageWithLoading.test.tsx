import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { HubAndProjectBlankImage } from 'ui/main/assets/icons';
import { createRender } from 'ui/testUtils/renderUtils';
import ImageWithLoading, { Props } from '../ImageWithLoading';

const IMAGE_URL = 'http://someImageUrl.com';
const DEFAULT_SVG = HubAndProjectBlankImage;
const SIZE = 300;

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<ImageWithLoading {...props} />);
};

describe('ImageWithLoading', () => {
  let render: () => RenderAPI;
  const defaultProps = { DefaultSvgImage: DEFAULT_SVG, height: SIZE, uri: IMAGE_URL, width: SIZE };

  describe('when the image is available', () => {
    beforeEach(() => {
      render = setup(defaultProps);
    });

    it('should render the image', () => {
      const { getByTestId } = render();

      const image = getByTestId('image');

      expect(image).toBeTruthy();
    });
  });

  describe('when the image is not available', () => {
    beforeEach(() => {
      render = setup({ ...defaultProps, uri: '' });
    });

    it('should render a placeholder image', async () => {
      const { findByTestId } = render();

      const image = await findByTestId('default-image');

      expect(image).toBeTruthy();
    });
  });

  describe('when the image is undefined', () => {
    beforeEach(() => {
      render = setup({ ...defaultProps, uri: undefined });
    });

    it('should render a placeholder image', async () => {
      const { findByTestId } = render();

      const image = await findByTestId('default-image');

      expect(image).toBeTruthy();
    });
  });
  describe('when image is not ready to loading', () => {
    beforeEach(() => {
      render = setup({ ...defaultProps, isReadyToLoad: false });
    });

    it('should render a placeholder image', async () => {
      const { findByTestId } = render();

      const image = await findByTestId('skeleton');

      expect(image).toBeTruthy();
    });
  });
});
