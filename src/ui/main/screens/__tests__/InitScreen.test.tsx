import { RenderAPI, waitFor } from '@testing-library/react-native';
import { PLAIN_TOKEN_MOCK } from '__mocks__/tokenMock';
import Token from 'core/authentication/domain/Token';
import TokenService from 'core/authentication/services/TokenService';
import DateTime, { DateFormat } from 'core/main/types/DateTime';
import { Settings } from 'luxon';
import React from 'react';
import { AppStackKey, AuthStackKey, HubsKey, LoginKey } from 'ui/main/navigation/navigationKeys';
import { createNavigationMock } from 'ui/testUtils/navigationMock';
import { createRender } from 'ui/testUtils/renderUtils';
import InitScreen from '../InitScreen';

const navigationMock = createNavigationMock();

const ADD_DAYS_TOKEN = 5;

Settings.defaultZone = 'utc';

const validToken = new Token({
  ...PLAIN_TOKEN_MOCK,
  accessTokenExpirationDate: DateTime.now().addDays(ADD_DAYS_TOKEN).format(DateFormat.ISO8601),
});

const expiredToken = new Token({
  ...PLAIN_TOKEN_MOCK,
  accessTokenExpirationDate: DateTime.now().format(DateFormat.ISO8601),
});

const setup = () => {
  const render = createRender({});

  return () => render(<InitScreen navigation={navigationMock} />);
};

describe('InitScreen', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    jest.spyOn(TokenService, 'get').mockResolvedValue(validToken);

    render = setup();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('When the user is logged in', () => {
    it('should redirect to the hubs screen', async () => {
      render();

      await waitFor(() => expect(navigationMock.replace).toHaveBeenCalledWith(AppStackKey, { screen: HubsKey }));
    });
  });

  describe('When the user token is expired', () => {
    beforeEach(() => {
      jest.spyOn(TokenService, 'get').mockResolvedValue(expiredToken);
    });

    it('should redirect to the login screen', async () => {
      render();

      await waitFor(() => expect(navigationMock.replace).toHaveBeenCalledWith(AuthStackKey, { screen: LoginKey }));
    });
  });

  describe('When the user token is not logged in', () => {
    beforeEach(() => {
      jest.spyOn(TokenService, 'get').mockResolvedValue(undefined);
    });

    it('should redirect to the login screen', async () => {
      render();

      await waitFor(() => expect(navigationMock.replace).toHaveBeenCalledWith(AuthStackKey, { screen: LoginKey }));
    });
  });
});
