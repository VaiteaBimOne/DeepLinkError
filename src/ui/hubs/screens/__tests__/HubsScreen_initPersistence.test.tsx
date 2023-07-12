import { RenderAPI, waitFor } from '@testing-library/react-native';
import TokenService from 'core/authentication/services/TokenService';
import RealmContext from 'core/main/persistence/RealmContext';
import PersistenceContext from 'core/main/persistence/repositories/PersistenceContext';
import ExternalFileService from 'core/main/persistence/services/ExternalFileService';
import React from 'react';
import { createNavigationMock } from 'ui/testUtils/navigationMock';
import { createRender } from 'ui/testUtils/renderUtils';
import HubsScreen from '../HubsScreen';

const A_USER_ID = 'userId';
jest.mock('react-native-gainsight-px', () => ({}));
jest.mock('launchdarkly-react-native-client-sdk', () => {
  return jest.fn().mockImplementation(() => {
    return { InitLaunchDarkly: jest.fn() };
  });
});

jest.mock('ui/main/hooks/useUpdateVersion.tsx', () =>
  jest.fn().mockReturnValue({
    actions: {
      cancelAction: () => jest.fn(),
      openStore: () => jest.fn(),
    },
  }),
);

const setup = () => {
  const render = createRender({});
  return () => render(<HubsScreen navigation={createNavigationMock()} />);
};

describe('Persistence Initialization', () => {
  let render: () => RenderAPI;
  const getUserIdMock = jest.fn().mockResolvedValue(A_USER_ID);
  const initializePersistenceMock = jest.fn().mockResolvedValue(undefined);
  const removeRepositoriesMock = jest.fn();

  beforeEach(() => {
    jest.spyOn(RealmContext, 'initializePersistence').mockImplementation(initializePersistenceMock);
    jest.spyOn(TokenService, 'getGlobalIdentifier').mockImplementation(getUserIdMock);
    jest.spyOn(ExternalFileService, 'hasSpaceLeftOnDevice').mockResolvedValue(true);
    jest.spyOn(PersistenceContext, 'removeRepositories').mockImplementation(removeRepositoriesMock);
    render = setup();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('when the screen is mounted', () => {
    it('should get the userId', async () => {
      render();

      await waitFor(() => expect(getUserIdMock).toHaveBeenCalledTimes(1));
    });

    it('should remove the repositories', async () => {
      render();

      await waitFor(() => expect(removeRepositoriesMock).toHaveBeenCalledTimes(1));
    });

    it('should initialize the persistence', async () => {
      render();

      await waitFor(() => expect(initializePersistenceMock).toHaveBeenCalledTimes(1));
    });
  });
});
