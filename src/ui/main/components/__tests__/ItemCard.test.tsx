import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import ItemCard, { ItemCardProps } from '../ItemCard';

const A_TITLE = 'title';
const A_IMAGEURL = 'imageUrl';

const setup = (props: ItemCardProps) => {
  const render = createRender({});

  return () => render(<ItemCard {...props} />);
};

const onPress = jest.fn();
describe('ItemCard', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    render = setup({ imageUrl: A_IMAGEURL, onPress, title: A_TITLE });
  });

  it('should render data name', () => {
    const { getByText } = render();

    const name = getByText(A_TITLE);

    expect(name).toBeTruthy();
  });

  it('should render data image', () => {
    const { getByTestId } = render();

    const image = getByTestId('image');

    expect(image).toBeTruthy();
  });

  describe('when clicking on a navigation card', () => {
    it('should call onPress', () => {
      const { getByText } = render();

      const name = getByText(A_TITLE);
      fireEvent(name, 'onPress');

      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('when the data image is not available', () => {
    beforeEach(() => {
      render = setup({ imageUrl: undefined, onPress, title: A_TITLE });
    });

    it('should render a placeholder image', async () => {
      const { findByTestId } = render();

      const image = await findByTestId('default-image');

      expect(image).toBeTruthy();
    });
  });
});
