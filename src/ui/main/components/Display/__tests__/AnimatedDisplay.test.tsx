import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import Button from 'ui/main/components/Button';
import AnimatedDisplay, { Props } from 'ui/main/components/Display/AnimatedDisplay';
import { createRender } from 'ui/testUtils/renderUtils';

const setup = (props: Props) => {
  const render = createRender({});

  return () =>
    render(
      <AnimatedDisplay {...props}>
        <Button testID='children-button' label='This is rendered' onPress={() => undefined} />
      </AnimatedDisplay>,
    );
};

describe('AnimatedDisplay', () => {
  let render: () => RenderAPI;

  describe('given not visible', () => {
    beforeEach(() => {
      render = setup({ visible: false });
    });

    it('should not render children', () => {
      const { queryByTestId } = render();

      const component = queryByTestId('children-button');

      expect(component).toBeFalsy();
    });
  });

  describe('given visible', () => {
    beforeEach(() => {
      render = setup({ visible: true });
    });

    it('should render children', () => {
      const { queryByTestId } = render();

      const component = queryByTestId('children-button');

      expect(component).toBeTruthy();
    });
  });
});
