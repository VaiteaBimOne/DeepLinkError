import useFeatureFlags from 'core/developer/hooks/useFeatureFlags';
import IssueListItem from 'core/issues/domain/IssueListItem';
import { IssuesTypes } from 'core/issues/hooks/useControllers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/native';
import { SelectionAction } from 'ui/issues/hooks/useSelectionActions';
import Button from 'ui/main/components/Button';
import AnimatedDisplay from 'ui/main/components/Display/AnimatedDisplay';
import useSelection from 'ui/main/hooks/useSelection';

interface Props {
  actions?: SelectionAction[];
  issues: IssueListItem[];
  projectId?: number;
  tab: IssuesTypes;
}

const SelectionHeader: React.FC<Props> = ({ actions, issues, projectId, tab }) => {
  const {
    selectors: { selectionMode },
    actions: { selectAll, enterSelectionMode, leaveSelectionMode },
  } = useSelection({ projectId, tab });

  const { t } = useTranslation('issues');

  const {
    metrics: { spacing },
  } = useTheme();

  const selectionButtonsHitSlop = { bottom: spacing[1], left: spacing[1], right: spacing[1] };

  const {
    selectors: {
      flags: { SELECT_ALL },
    },
  } = useFeatureFlags();

  return (
    <AnimatedDisplay visible={!!issues.length && !!actions?.length} enter='fadeInDown' exit='fadeOutUp'>
      <ButtonContainer testID='selection-header'>
        {selectionMode ? (
          <>
            {SELECT_ALL && (
              <StyledButton
                hitSlop={selectionButtonsHitSlop}
                variant='subtle'
                onPress={() => selectAll(issues)}
                label={t('selection.selectAll')}
                testID='select-button'
              />
            )}
            <StyledButton
              hitSlop={selectionButtonsHitSlop}
              variant='subtle'
              onPress={leaveSelectionMode}
              label={t('selection.cancel')}
              testID='select-button'
            />
          </>
        ) : (
          <StyledButton
            hitSlop={selectionButtonsHitSlop}
            variant='subtle'
            onPress={enterSelectionMode}
            label={t('selection.select')}
            testID='select-button'
          />
        )}
      </ButtonContainer>
    </AnimatedDisplay>
  );
};

const StyledButton = styled(Button)`
  padding-bottom: ${(props) => props.theme.metrics.spacing[1]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[3]}px;
`;

const ButtonContainer = styled.View`
background-color: ${(props) => props.theme.colors.grey.lightest}
  flex-direction: row;
  justify-content: flex-end;
`;

export default SelectionHeader;
