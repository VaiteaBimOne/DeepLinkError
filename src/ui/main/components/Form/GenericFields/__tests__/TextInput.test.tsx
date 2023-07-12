import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { createRender } from 'ui/testUtils/renderUtils';
import TextInput, { Props } from '../TextInput/TextInput';

const A_TEST_ID = 'TEST_ID';
const AN_ICON = <View testID='input-icon' />;

const setup = (props: Partial<Props>) => {
  const render = createRender({});

  return () => render(<TextInput {...props} />);
};

describe('TextInput', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    render = setup({ testId: A_TEST_ID });
  });

  it('Given an error is provided, when rendering, should display the label', () => {
    // GIVEN
    render = setup({ error: 'error' });

    // WHEN
    const { getByText } = render();

    // THEN
    const labelComponent = getByText('error');
    expect(labelComponent).toBeTruthy();
  });

  it('Given no label is provided, when rendering, should display the label', () => {
    // GIVEN
    render = setup({ label: '', testId: A_TEST_ID, value: 'value' });

    // WHEN
    const { queryByText } = render();

    // THEN
    const labelComponent = queryByText('label');
    expect(labelComponent).toBeFalsy();
  });

  it('Given a label is provided, when rendering, should display the label', () => {
    // GIVEN
    render = setup({ label: 'label', testId: A_TEST_ID, value: 'value' });

    // WHEN
    const { queryByText } = render();

    // THEN
    const labelComponent = queryByText('label');
    expect(labelComponent).toBeTruthy();
  });

  it('Given a label is provided and value starts with whitespace, when rendering, should trim the starting whitespaces', () => {
    // GIVEN
    render = setup({ label: 'label', testId: A_TEST_ID, value: 'value' });

    // WHEN
    const { queryByDisplayValue } = render();

    // THEN
    const labelComponent = queryByDisplayValue('value');
    expect(labelComponent).toBeTruthy();
  });

  it('Given the text input is rendered, when changing the value to an empty string, the value should stay undefined', async () => {
    // GIVEN
    render = setup({ label: 'label', testId: A_TEST_ID, value: undefined });

    // WHEN
    const { findByTestId } = render();
    const inputText = await findByTestId(A_TEST_ID);
    fireEvent.changeText(inputText, ' ');

    // THEN
    expect(inputText.props.value).toBe(undefined);
  });

  it('Given the text input is rendered, when changing the value with space in from, the value should remove the front spaces', async () => {
    // GIVEN
    render = setup({ label: 'label', testId: A_TEST_ID, value: undefined });

    // WHEN
    const { findByTestId } = render();
    const inputText = await findByTestId(A_TEST_ID);
    fireEvent.changeText(inputText, '  test');

    // THEN
    expect(inputText.props.value).toBe('test');
  });

  it('Given an icon is provided, when rendering, should display the right icon', () => {
    // GIVEN
    render = setup({ label: 'label', rightIcon: AN_ICON, testId: A_TEST_ID, value: 'value' });

    // WHEN
    const { getByTestId } = render();

    // THEN
    const iconComponent = getByTestId('input-icon');
    expect(iconComponent).toBeTruthy();
  });
});
