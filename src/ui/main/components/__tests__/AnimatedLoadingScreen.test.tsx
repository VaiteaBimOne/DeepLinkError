import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import { AnimatedLoadingScreen } from '../AnimatedLoadingScreen';

const FILE_NAME = 'file';
const A_LABEL = 'label';
const ON_CANCEL = jest.fn();

const setup = (onCancel?: () => void) => {
  const render = createRender({});

  return () => render(<AnimatedLoadingScreen label={A_LABEL} name={FILE_NAME} onCancel={onCancel} />);
};

describe('AnimatedLoadingScreen', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    render = setup(ON_CANCEL);
  });

  it('should display file name', () => {
    const { getByText } = render();

    const fileName = getByText(FILE_NAME);

    expect(fileName).toBeTruthy();
  });

  it('should display loading message', () => {
    const { getByText } = render();

    const message = getByText(A_LABEL);

    expect(message).toBeTruthy();
  });

  it('should display cancel button', () => {
    const { getByText } = render();

    const cancel = getByText('Cancel');

    expect(cancel).toBeTruthy();
  });

  describe('when clicking on cancel', () => {
    it('should call onCancel', () => {
      const { getByText } = render();

      const cancel = getByText('Cancel');
      fireEvent(cancel, 'onPress');

      expect(ON_CANCEL).toHaveBeenCalled();
    });
  });
  describe('when no cancel callback is passed', () => {
    beforeEach(() => {
      render = setup(undefined);
    });

    it('should not display cancel button ', () => {
      const { queryByText } = render();

      const cancel = queryByText('Cancel');

      expect(cancel).toBeFalsy();
    });
  });
});
