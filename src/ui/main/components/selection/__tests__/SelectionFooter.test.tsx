import { fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { IssueListActions } from 'ui/issues/components/IssueListActions';
import { CloudImport, Trash } from 'ui/main/assets/icons';
import { createRender } from 'ui/testUtils/renderUtils';
import SelectionFooter, { SelectionFooterProps } from '../SelectionFooter';

const closeSelectionMock = jest.fn();
const archiveMock = jest.fn();
const syncMock = jest.fn();
const syncAllMock = jest.fn();
const AN_SELECTED_ID = 1;
const setup = (props: Partial<SelectionFooterProps>, selectedIds?: number[]) => {
  const render = createRender({});

  return () => render(<SelectionFooter closeSelection={closeSelectionMock} selectedIds={selectedIds || []} selectionMode={true} {...props} />);
};

const archiveMultiple = {
  action: archiveMock,
  icon: Trash,
  key: 'delete',
  type: IssueListActions.Archive,
};

const sync = {
  action: syncMock,
  icon: CloudImport,
  key: 'sync',
  type: IssueListActions.Sync,
};

const syncAll = {
  action: syncAllMock,
  icon: CloudImport,
  key: 'syncAll',
  type: IssueListActions.SyncAll,
};

describe('SelectionFooter', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Given multiple actions, when rendering, should render each action', async () => {
    //GIVEN
    const render = setup({ actions: [archiveMultiple, sync, syncAll] });

    //WHEN
    const { findByTestId } = render();
    const archiveAction = await findByTestId(archiveMultiple.key);
    const syncAction = await findByTestId(sync.key);
    const syncAllAction = await findByTestId(syncAll.key);

    //THEN
    expect(archiveAction).toBeTruthy();
    expect(syncAction).toBeTruthy();
    expect(syncAllAction).toBeTruthy();
  });

  test('Given multiple actions, when clicking on archive action, should call the right action', async () => {
    //GIVEN
    const render = setup({ actions: [archiveMultiple, sync, syncAll] }, [AN_SELECTED_ID]);

    //WHEN
    const { getByTestId } = render();
    const archiveAction = getByTestId(archiveMultiple.key);
    fireEvent(archiveAction, 'onPress');

    //THEN
    await waitFor(() => expect(archiveMock).toHaveBeenCalled());
  });

  test('Given multiple actions, when clicking on an action and the action succeeds, should call close selection', async () => {
    //GIVEN
    const render = setup({ actions: [archiveMultiple, sync, syncAll] }, [AN_SELECTED_ID]);

    //WHEN
    const { getByTestId } = render();
    const archiveAction = getByTestId(archiveMultiple.key);
    fireEvent(archiveAction, 'onPress');

    //THEN
    await waitFor(() => expect(closeSelectionMock).toHaveBeenCalled());
  });

  test('Given multiple actions, when rendering without selected issues, should render the download action disabled', async () => {
    //GIVEN
    const render = setup({ actions: [archiveMultiple, sync, syncAll] });

    //WHEN
    const { findByTestId } = render();
    const syncAction = await findByTestId(sync.key);
    const syncAllAction = await findByTestId(syncAll.key);

    //THEN
    expect(syncAction).toBeDisabled();
    expect(syncAllAction).not.toBeDisabled();
  });

  test('Given multiple actions, when rendering with selected issues, should render the download action active', async () => {
    //GIVEN
    const render = setup({ actions: [archiveMultiple, sync, syncAll], selectedIds: [1, 2, 3] });

    //WHEN
    const { findByTestId } = render();
    const syncAction = await findByTestId(sync.key);
    const syncAllAction = await findByTestId(syncAll.key);

    //THEN
    expect(syncAction).not.toBeDisabled();
    expect(syncAllAction).not.toBeDisabled();
  });
});
