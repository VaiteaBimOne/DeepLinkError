import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import DefaultMultiPickerInput from '../MultiPicker/DefaultMultiPickerInput';
import MultiPicker, { Props } from '../MultiPicker/MultiPicker';

const A_TEST_ID = 'TEST_ID';
const A_LABEL = 'A_LABEL';
const OPTIONS = [
  { label: 'option 1', value: '123' },
  { label: 'option 2', value: '1234' },
];

let render: () => RenderAPI;
const onChangeMock = jest.fn();

const setup = (props: Partial<Props>) => {
  const render = createRender({});

  return () =>
    render(
      <MultiPicker {...props} name='MultiPicker'>
        {DefaultMultiPickerInput}
      </MultiPicker>,
    );
};

const setupWithOptions = () => {
  const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, testId: A_TEST_ID });
  const renderResult = render();
  return renderResult;
};

describe('MultiPicker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Given an error, when rendered, should display the error label', () => {
    // GIVEN
    const error = { error: 'error' };
    render = setup(error);

    // WHEN
    const { getByText } = render();
    const labelComponent = getByText('error');

    // THEN
    expect(labelComponent).toBeTruthy();
  });

  test('Given no label, when rendered, should not display the label', () => {
    // GIVEN
    render = setup({ label: '', testId: A_TEST_ID });

    // WHEN
    const { queryByText } = render();
    const labelComponent = queryByText(A_LABEL);

    // THEN
    expect(labelComponent).toBeFalsy();
  });

  test('Given a label, when rendered, should display the label', () => {
    // GIVEN
    render = setup({ label: A_LABEL, testId: A_TEST_ID });

    // WHEN
    const { queryAllByText } = render();
    const labelComponent = queryAllByText(A_LABEL);

    // THEN
    expect(labelComponent).toBeTruthy();
  });

  test('Given rendered component with options, when pressing the input, should open the selection modal', () => {
    // GIVEN
    const { getByTestId } = setupWithOptions();

    // WHEN

    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');
    const labelComponent = getByTestId('selection-modal');

    // THEN
    expect(labelComponent).toBeTruthy();
  });

  test('Given rendered component with options, when pressing an option, should display the options', async () => {
    // GIVEN
    const { getByTestId, getByText } = setupWithOptions();

    // WHEN
    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');

    // THEN
    const option1 = getByText(OPTIONS[0].label);
    const option2 = getByText(OPTIONS[1].label);

    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
  });

  test('Given rendered component with options, when pressing an option, should invoke onChange with the value', () => {
    // GIVEN
    const { getByTestId, getByText } = setupWithOptions();

    // WHEN
    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');

    // THEN
    const option1 = getByText(OPTIONS[0].label);
    fireEvent(option1, 'onPress');

    // THEN
    expect(onChangeMock).toHaveBeenCalledWith([OPTIONS[0].value]);
  });

  test('Given rendered component with options, when pressing remove, should invoke onChange with the value ', () => {
    // GIVEN
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOptions: [OPTIONS[0]], testId: A_TEST_ID });
    const { getByTestId } = render();
    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');
    const removeButton = getByTestId('remove-button');

    // WHEN
    fireEvent(removeButton, 'onPress');

    // THEN
    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });

  test('Given rendered component with options, when pressing remove, should invoke onChange with the value , should not close the modal', () => {
    // GIVEN
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOptions: [OPTIONS[0]], testId: A_TEST_ID });
    const { getByTestId } = render();
    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');
    const removeButton = getByTestId('remove-button');

    // WHEN
    fireEvent(removeButton, 'onPress');
    const labelComponent = getByTestId('selection-modal');

    // THEN
    expect(labelComponent).toHaveProp('visible', true);
  });

  describe('Given rendered component with options, when a selectedOptions are passed, should display a checkmark in the selected option', () => {
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOptions: [OPTIONS[0]], testId: A_TEST_ID });

    const { getByTestId } = render();

    // WHEN
    const input = getByTestId('picker-input');
    fireEvent(input, 'onPress');

    // THEN
    const checkmark = getByTestId('button-icon');
    expect(checkmark).toBeTruthy();
  });
});
