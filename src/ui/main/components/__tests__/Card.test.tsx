import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Card from '../Card';

const CARD_ID = 'card';

const setup = () => {
  const render = createRender({});
  return (onPress?: () => void) => render(<Card testID={CARD_ID} onPress={onPress} />);
};

describe('Card', () => {
  let render: (onPress?: () => void) => RenderAPI;

  beforeEach(() => {
    render = setup();
  });
  describe('when a onPress function is provided', () => {
    const onPress = jest.fn();
    describe('when pressing on the card', () => {
      it('should call the onPress function', () => {
        const { getByTestId } = render(onPress);

        const cardComponent = getByTestId(CARD_ID);
        fireEvent(cardComponent, 'onPress');

        expect(onPress).toHaveBeenCalled();
      });
    });
  });
});
