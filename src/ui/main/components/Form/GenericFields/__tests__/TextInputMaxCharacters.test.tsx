import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import TextInputMaxCharacters, { Props } from '../Errors/TextInputMaxCharacters';

const setup = (props: Partial<Props>) => {
  const render = createRender({});

  return () => render(<TextInputMaxCharacters value={props.value} maxLength={props.maxLength} />);
};

describe('TextInput', () => {
  let render: () => RenderAPI;

  it('Given a value that is the same a the max length possible, when rendering, should display the error label', () => {
    // GIVEN
    render = setup({ maxLength: 3, value: 'abc' });

    // WHEN
    const { getByText } = render();

    // THEN
    const labelComponent = getByText('3 character limit reached');
    expect(labelComponent).toBeTruthy();
  });

  it('Given a value that is smaller than the max length possible, when rendering, should not display the error label', () => {
    // GIVEN
    render = setup({ maxLength: 20, value: 'abc' });

    // WHEN
    const { queryByText } = render();

    // THEN
    const labelComponent = queryByText('3 character limit reached');
    expect(labelComponent).toBeFalsy();
  });
});
