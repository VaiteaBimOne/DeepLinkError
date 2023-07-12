import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import DefaultPickerInput from 'ui/main/components/Form/GenericFields/Picker/DefaultPickerInput';
import { createRender } from 'ui/testUtils/renderUtils';
import Picker, { Props } from '../Picker/Picker';

const A_TEST_ID = 'TEST_ID';
const A_LABEL = 'A_LABEL';
const OPTIONS = [
  { label: 'option 1', value: '123' },
  { label: 'option 2', value: '1234' },
];

const A_LOT_OF_OPTIONS = [
  { label: 'option 1', value: '1' },
  { label: 'option 2', value: '2' },
  { label: 'option 3', value: '3' },
  { label: 'option 4', value: '4' },
  { label: 'option 5', value: '5' },
  { label: 'option 6', value: '6' },
  { label: 'option 7', value: '7' },
  { label: 'option 8', value: '8' },
  { label: 'option 9', value: '9' },
  { label: 'option 10', value: '10' },
  { label: 'option 11', value: '11' },
  { label: 'option 12', value: '12' },
];

const setup = (props: Partial<Props>) => {
  const render = createRender({});

  return () =>
    render(
      <Picker {...props} name='pickerTest'>
        {DefaultPickerInput}
      </Picker>,
    );
};

describe('Picker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('given an error, when rendering, should display the label', async () => {
    //GIVEN
    const render = setup({ error: 'error' });
    const { findByText } = render();

    //WHEN
    const labelComponent = await findByText('error');

    //THEN
    expect(labelComponent).toBeTruthy();
  });

  test('given no label, when rendering, should not display the label', async () => {
    //GIVEN
    const render = setup({ label: '', testId: A_TEST_ID });
    const { queryByText } = render();

    //WHEN
    const labelComponent = queryByText(A_LABEL);

    //THEN
    expect(labelComponent).toBeFalsy();
  });

  test('given a label, when rendering, should display the label', async () => {
    //GIVEN
    const render = setup({ label: A_LABEL, testId: A_TEST_ID });
    const { findByTestId } = render();

    //WHEN
    const labelComponent = await findByTestId('title');

    //THEN
    expect(labelComponent).toBeTruthy();
  });

  test('given options, when pressing on the label, should display the modal', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS });
    const { getByTestId } = render();

    // WHEN
    openPicker(getByTestId);

    //THEN
    const modal = getByTestId('selection-modal');
    expect(modal).toBeTruthy();
  });

  test('given options, when displaying picker, should display the options', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS });
    const { getByTestId, getByText } = render();

    //WHEN
    openPicker(getByTestId);
    const option1 = getByText(OPTIONS[0].label);
    const option2 = getByText(OPTIONS[1].label);

    //THEN
    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
  });

  test('given options and the modal is opened, when pressing on the option, should invoke onChange with the value', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS });
    const { getByTestId, getByText } = render();
    openPicker(getByTestId);

    //WHEN
    const option1 = getByText(OPTIONS[0].label);

    fireEvent(option1, 'onPress');

    //THEN
    expect(onChangeMock).toHaveBeenCalledWith(OPTIONS[0].value);
  });

  test('given the modal is opened, when pressing remove, should invoke onChange with undefined', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOption: OPTIONS[0] });
    const { getByTestId } = render();
    openPicker(getByTestId);

    //WHEN
    const removeButton = getByTestId('remove-button');

    fireEvent(removeButton, 'onPress');

    //THEN
    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });

  test('given the modal is opened , when pressing remove, should invoke onChange with undefined', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOption: OPTIONS[0] });
    const { getByTestId } = render();
    openPicker(getByTestId);

    //WHEN
    const removeButton = getByTestId('remove-button');

    fireEvent(removeButton, 'onPress');

    //THEN
    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });

  test('given the modal is opened and a selectedOption, when rendering, should display a checkmark in the selected option', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOption: OPTIONS[0], testId: A_TEST_ID });
    const { getByTestId } = render();
    openPicker(getByTestId);

    //WHEN
    const checkmark = getByTestId('button-icon');

    //THEN
    expect(checkmark).toBeTruthy();
  });

  test('given the modal is opened and less then 10 options, when rendering, should not display the search bar', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: OPTIONS, selectedOption: OPTIONS[0], testId: A_TEST_ID });
    const { getByTestId, queryByTestId } = render();
    openPicker(getByTestId);

    //WHEN
    const searchBar = queryByTestId('search-bar');

    //THEN
    expect(searchBar).toBeFalsy();
  });

  test('given the modal is opened and more then 10 options, when rendering, should display the search bar', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: A_LOT_OF_OPTIONS, selectedOption: OPTIONS[0], testId: A_TEST_ID });
    const { getByTestId } = render();
    openPicker(getByTestId);

    //WHEN
    const searchBar = getByTestId('search-bar');

    //THEN
    expect(searchBar).toBeTruthy();
  });

  test('given the modal is opened and more then 10 options, when typing in the search bar, should only render the searched value', () => {
    //GIVEN
    const onChangeMock = jest.fn();
    const render = setup({ label: A_LABEL, onChange: onChangeMock, options: A_LOT_OF_OPTIONS, selectedOption: OPTIONS[0], testId: A_TEST_ID });
    const { getByTestId, queryByText } = render();
    openPicker(getByTestId);

    //WHEN
    const searchBar = getByTestId('search-bar');

    fireEvent(searchBar, 'onChange', '2');

    //THEN
    const option1 = queryByText('option 1');
    const option2 = queryByText('option 2');

    expect(option1).toBeNull();
    expect(option2).toBeTruthy();
  });

  test('given the modal is opened and a reset field function, when rendering, should display the remove button', () => {
    //GIVEN
    const render = setup({ label: A_LABEL, options: A_LOT_OF_OPTIONS, resetField: () => {}, selectedOption: OPTIONS[0], testId: A_TEST_ID });
    const { getByTestId, getByText } = render();
    openPicker(getByTestId);

    //WHEN
    const button = getByText('Remove');

    //THEN
    expect(button).toBeTruthy();
  });
});

const openPicker = (getByTestId: (testId: string) => ReactTestInstance) => {
  const input = getByTestId('picker-input');
  fireEvent(input, 'onPress');
};
