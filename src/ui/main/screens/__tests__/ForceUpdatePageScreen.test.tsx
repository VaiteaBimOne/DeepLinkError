import { AppStore } from 'core/redux/store';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import ForceUpdateScreen, { ForceUpdateEnum } from '../ForceUpdateScreen';

jest.mock('react-native-device-info', () => {
  return {
    isTablet: () => true,
  };
});

let store: AppStore;

const setup = (forceUpdateType: ForceUpdateEnum) => {
  const render = createRender({ store });
  return () => {
    return render(<ForceUpdateScreen forceUpdateType={forceUpdateType} />);
  };
};

describe('Force update screen', () => {
  test('Check if enhence type render', async () => {
    // GIVEN
    const render = setup(ForceUpdateEnum.EXPERIENCE);

    // WHEN
    const { findByText } = render();
    const title = await findByText('Enhancing your experience');

    // THEN
    expect(title).toBeTruthy();
  });

  test('Check if security type render', async () => {
    // GIVEN
    const render = setup(ForceUpdateEnum.SECURITY);

    // WHEN
    const { findByText } = render();
    const title = await findByText('Security first');

    // THEN
    expect(title).toBeTruthy();
  });

  test('Check if regulatory type render', async () => {
    // GIVEN
    const render = setup(ForceUpdateEnum.REGULATORY);

    // WHEN
    const { findByText } = render();
    const title = await findByText('Regulatory updates');

    // THEN
    expect(title).toBeTruthy();
  });
});
