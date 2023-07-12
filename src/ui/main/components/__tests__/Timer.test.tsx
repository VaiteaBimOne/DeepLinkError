import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import Timer from '../Timer';

const renderComponent = (start: boolean) => {
  const render = createRender({});

  return render(<Timer start={start} />);
};

describe('Timer', () => {
  test('Give the timer is not started, when rendering, should display 00 : 00', async () => {
    //GIVEN
    const start = false;

    //WHEN
    const { findByText } = renderComponent(start);
    const label = await findByText('00 : 00');

    //THEN
    expect(label).toBeTruthy();
  });

  test('Give the timer is started, when rendering, should start the timer', async () => {
    //GIVEN
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval').mockImplementation(jest.fn());

    const start = true;

    //WHEN
    const {} = renderComponent(start);

    //THEN
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
