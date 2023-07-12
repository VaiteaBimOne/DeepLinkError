import IssueListItem from 'core/issues/domain/IssueListItem';
import { IssuesTypes } from 'core/issues/hooks/useControllers';
import { enterSelectionMode, leaveSelectionMode, select, selectOne } from 'core/issues/state/selectionReducer';
import { selectSelectedIds, selectSelectionMode } from 'core/issues/state/selectionSelectors';
import { RootState, useAppDispatch } from 'core/redux/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

interface SelectionSelectors {
  selectionMode: boolean;
  selectedIds: number[];
}

interface SelectionActions {
  selectAll: (issues: IssueListItem[]) => void;
  enterSelectionMode: () => void;
  leaveSelectionMode: () => void;
  selectOne: (id: number) => void;
  isChecked: (id: number) => boolean;
}

export interface SelectionHook {
  actions: SelectionActions;
  selectors: SelectionSelectors;
}

interface SelectionProps {
  projectId?: number;
  tab: IssuesTypes;
}

const useSelection = ({ projectId, tab }: SelectionProps): SelectionHook => {
  const dispatch = useAppDispatch();

  const selectedIds = useSelector((state: RootState) => selectSelectedIds(state, projectId, tab));
  const selectionMode = useSelector((state: RootState) => selectSelectionMode(state, projectId, tab));

  const selectAll = (issues: IssueListItem[]) => {
    dispatch(select({ ids: issues.map((x) => x.id), projectId, tab }));
  };
  const handleEnterSelectionMode = useCallback(() => {
    dispatch(enterSelectionMode({ projectId, tab }));
  }, [dispatch, projectId, tab]);

  const handleLeaveSelectionMode = useCallback(() => {
    dispatch(leaveSelectionMode({ projectId, tab }));
  }, [dispatch, projectId, tab]);

  const handleSelectOne = useCallback(
    (id: number) => {
      dispatch(selectOne({ id, projectId, tab }));
    },
    [dispatch, projectId, tab],
  );

  const isChecked = useCallback(
    (id: number) => {
      return selectedIds.indexOf(id) >= 0;
    },
    [selectedIds],
  );

  return {
    actions: {
      enterSelectionMode: handleEnterSelectionMode,
      isChecked,
      leaveSelectionMode: handleLeaveSelectionMode,
      selectAll,
      selectOne: handleSelectOne,
    },
    selectors: {
      selectedIds,
      selectionMode,
    },
  };
};

export default useSelection;
