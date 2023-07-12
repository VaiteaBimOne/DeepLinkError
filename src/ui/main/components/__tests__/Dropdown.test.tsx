import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Dropdown, { Props } from '../Dropdown';

const A_LABEL = 'Label';
const onPressMock = jest.fn();

const setup = (props: Props) => {
  const render = createRender({});
  return () => render(<Dropdown {...props} />);
};

describe('Dropdown', () => {
  let render: (onPress?: () => void) => RenderAPI;

  beforeEach(() => {
    render = setup({ menuItems: [{ disabled: false, label: A_LABEL, onPress: onPressMock }] });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('displays the label', () => {
    const { getByText } = render();

    const labelComponent = getByText(A_LABEL);

    expect(labelComponent).toBeTruthy();
  });

  describe('when option is pressed', () => {
    it('invokes onPress', () => {
      const { getByTestId } = render();

      const itemComponent = getByTestId('dropdown-item');
      fireEvent(itemComponent, 'onPress');

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('given option is disabled', () => {
    beforeEach(() => {
      render = setup({ menuItems: [{ disabled: true, label: A_LABEL, onPress: onPressMock }] });
    });

    describe('when option is pressed', () => {
      it('does not invokes onPress', () => {
        const { getByTestId } = render();

        const itemComponent = getByTestId('dropdown-item');
        fireEvent(itemComponent, 'onPress');

        expect(onPressMock).not.toHaveBeenCalled();
      });
    });
  });
});
