import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import TextAttribute from '../TextAttribute';

const A_LABEL = 'LABEL';
const A_VALUE = 'Value';

const setup = () => {
  const render = createRender({});

  return () => render(<TextAttribute label={A_LABEL} value={A_VALUE} />);
};

describe('TextAttribute', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    render = setup();
  });

  describe('when a label is provided', () => {
    it('should display the label', () => {
      const { getByText } = render();

      const component = getByText(A_LABEL);

      expect(component).toBeTruthy();
    });
  });

  describe('when a value is provided', () => {
    it('should display the value', () => {
      const { getByText } = render();

      const component = getByText(A_VALUE);

      expect(component).toBeTruthy();
    });
  });
});
