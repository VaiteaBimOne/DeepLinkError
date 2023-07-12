import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import Toggle, { Props } from 'ui/main/components/Toggle';
import { createRender } from 'ui/testUtils/renderUtils';

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<Toggle {...props} />);
};

describe('Toggle', () => {
  let render: () => RenderAPI;
  const onPressMock = jest.fn();

  beforeEach(() => {
    render = setup({ identifier: 'some-identifier', testID: 'my-toggle', update: onPressMock, value: false });
  });

  it('should invoke update when pressed', () => {
    const { getByTestId } = render();
    const toggleComponent = getByTestId('my-toggle');

    fireEvent(toggleComponent, 'valueChange', true);

    expect(onPressMock).toHaveBeenCalled();
  });
});
