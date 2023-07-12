import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import SearchBar, { SearchBarProps } from 'ui/main/components/SearchBar';
import { createRender } from 'ui/testUtils/renderUtils';

const setup = (props: SearchBarProps) => {
  const render = createRender({});

  return () => render(<SearchBar filterValues={props.filterValues} name={props.name} />);
};

const A_VALUE = 'A_VALUE';

describe('SearchBar', () => {
  let render: () => RenderAPI;
  const filterValuesMock = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render = setup({ filterValues: filterValuesMock, name: 'categoryName' });
  });

  test('given the searchBar is rendered, when displaying, it should display the placeholder', async () => {
    //GIVEN
    const { findByPlaceholderText } = render();

    //WHEN
    const placeholder = await findByPlaceholderText('Search');

    //THEN
    expect(placeholder).toBeTruthy();
  });

  test('given the searchBar is rendered, when changing the value, it should call filterValues', async () => {
    //GIVEN
    const { findByTestId } = render();

    //WHEN
    const searchBar = await findByTestId('search-bar');

    fireEvent(searchBar, 'onChange', A_VALUE);

    //THEN
    expect(filterValuesMock).toHaveBeenCalledWith(A_VALUE);
  });
});
