import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Label from '../Label';

const A_LABEL = 'Label';

const setup = () => {
  const render = createRender({});
  return (onPress?: () => void) => render(<Label onPress={onPress}>{A_LABEL}</Label>);
};

describe('Label', () => {
  let render: (onPress?: () => void) => RenderAPI;

  beforeEach(() => {
    render = setup();
  });

  describe('when a label is provided', () => {
    it('displays the label', () => {
      const { getByText } = render();

      const labelComponent = getByText(A_LABEL);

      expect(labelComponent).toBeTruthy();
    });

    describe('when a onPress function is provided', () => {
      const onPress = jest.fn();

      describe('when clicking on the label', () => {
        it('should call onPress function', () => {
          const { getByText } = render(onPress);

          const labelComponent = getByText(A_LABEL);
          fireEvent(labelComponent, 'onPress');

          expect(onPress).toHaveBeenCalled();
        });
      });
    });
  });
});
