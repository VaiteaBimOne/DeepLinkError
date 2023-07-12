import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Button, { Props } from '../Button';

const A_LABEL = 'Label';
const A_DESCRIPTION = 'Description';
const SOME_INITIALS = 'AA';
const A_TEST_ID = 'testID';

const setup = (props: Props) => {
  const render = createRender({});

  return () => render(<Button {...props} />);
};

describe('Button', () => {
  let render: () => RenderAPI;
  const onPressMock = jest.fn();
  describe('with basic props', () => {
    beforeEach(() => {
      render = setup({ label: A_LABEL, onPress: onPressMock, testID: A_TEST_ID });
    });

    it('displays the label', () => {
      const { getByText } = render();

      const labelComponent = getByText(A_LABEL);

      expect(labelComponent).toBeTruthy();
    });

    it('should invoke on press when pressed', () => {
      const { getByTestId } = render();
      const buttonComponent = getByTestId(A_TEST_ID);

      fireEvent.press(buttonComponent);

      expect(onPressMock).toHaveBeenCalled();
    });

    it('should not diplay the description', () => {
      const { queryByText } = render();

      expect(queryByText(A_DESCRIPTION)).toBeFalsy();
    });

    it('shoudl not display the avatar', () => {
      const { queryByTestId } = render();
      const avatarComponent = queryByTestId('avatar-wrapper');

      expect(avatarComponent).toBeFalsy();
    });
  });

  describe('with additional description', () => {
    beforeEach(() => {
      render = setup({ description: A_DESCRIPTION, label: A_LABEL, onPress: onPressMock, testID: A_TEST_ID });
    });
    it('should diplay the description and label', () => {
      const { getByText } = render();

      const descriptionComponent = getByText(A_DESCRIPTION);
      const labelComponent = getByText(A_LABEL);

      expect(descriptionComponent).toBeTruthy();
      expect(labelComponent).toBeTruthy();
    });
  });

  describe('with additional avatar and initials', () => {
    beforeEach(() => {
      render = setup({ description: A_DESCRIPTION, initials: SOME_INITIALS, label: A_LABEL, onPress: onPressMock, testID: A_TEST_ID });
    });

    it('shoudl display the avatar', () => {
      const { getByTestId } = render();
      const avatarComponent = getByTestId('avatar-wrapper');

      expect(avatarComponent).toBeTruthy();
    });
  });
});
