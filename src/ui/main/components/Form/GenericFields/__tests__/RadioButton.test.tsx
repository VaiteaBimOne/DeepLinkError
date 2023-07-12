import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import RadioButton, { Props } from '../RadioButton';

const A_LABEL = 'A_LABEL';
const OPTIONS = [
  { label: 'option 1', value: '123' },
  { label: 'option 2', value: '1234' },
];

const setup = (props: Partial<Props>) => {
  const render = createRender({});

  return () => render(<RadioButton {...props} />);
};

describe('RadioButton', () => {
  let render: () => RenderAPI;
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render = setup({});
  });

  describe('when no label is provided', () => {
    beforeEach(() => {
      render = setup({ label: '' });
    });

    it('should not display the label', () => {
      const { queryByText } = render();

      const labelComponent = queryByText(A_LABEL);

      expect(labelComponent).toBeFalsy();
    });
  });

  describe('when a label is provided', () => {
    beforeEach(() => {
      render = setup({ label: A_LABEL });
    });

    it('should display the label', () => {
      const { queryAllByText } = render();

      const labelComponent = queryAllByText(A_LABEL);

      expect(labelComponent).toBeTruthy();
    });
  });

  describe('given options are provided', () => {
    beforeEach(() => {
      render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS });
    });

    it('should display the options', () => {
      const { getByText } = render();

      const option1 = getByText(OPTIONS[0].label);
      const option2 = getByText(OPTIONS[1].label);

      expect(option1).toBeTruthy();
      expect(option2).toBeTruthy();
    });

    describe('when pressing an option', () => {
      it('should invoke onChange', () => {
        const { getByText } = render();
        const option1 = getByText(OPTIONS[0].label);

        fireEvent(option1, 'onPress');

        expect(onChangeMock).toHaveBeenCalledWith(OPTIONS[0].value);
      });
    });
  });
});
