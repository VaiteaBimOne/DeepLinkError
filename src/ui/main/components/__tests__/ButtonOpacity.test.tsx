import { RenderAPI, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { OpenExternal } from 'ui/main/assets/icons';
import { createRender } from 'ui/testUtils/renderUtils';
import ButtonOpacity from '../ButtonOpacity';
import { Props } from '../ButtonOpacity';

const BUTTON_LABEL = 'A LABEL';

const setup = (props: Props) => {
  const render = createRender({});
  return () => render(<ButtonOpacity {...props} />);
};

describe('ButtonOpacity', () => {
  let render: () => RenderAPI;
  const onPressMock = jest.fn();

  beforeEach(() => {
    render = setup({ label: BUTTON_LABEL, onPress: onPressMock });
  });

  test('buttonOpacity_WhenClickOnButton_ShouldCallOnPress', () => {
    const { getByTestId } = render();

    const button = getByTestId('buttonOpacityWrapper');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('buttonOpacity_WhenButtonIsRendered_ShouldRenderLabel', () => {
    const { getByText } = render();

    const labelComponent = getByText(BUTTON_LABEL);

    expect(labelComponent).toBeTruthy();
  });

  it('buttonOpacity_WhenIconIsDefined_ShouldRenderIcon', () => {
    render = setup({ Icon: OpenExternal, label: BUTTON_LABEL, onPress: onPressMock });
    const { getByTestId } = render();

    const buttonIcon = getByTestId('buttonOpacityIcon');

    expect(buttonIcon).toBeTruthy();
  });
});
