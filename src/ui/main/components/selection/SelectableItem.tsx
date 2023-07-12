import { IssuesTypes } from 'core/issues/hooks/useControllers';
import useSwipe from 'core/issues/hooks/useSwipe';
import React, { useEffect, useMemo, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IssueAction from 'ui/issues/components/IssueAction';
import { SwipeAction } from 'ui/issues/hooks/useSwipeActions';
import Checkbox from 'ui/main/components/Checkbox';
import SwipeableCard from 'ui/main/components/SwipeableCard';
import useSelection from 'ui/main/hooks/useSelection';

interface Props {
  item: React.ReactNode;
  id: number;
  actions?: SwipeAction[];
  projectId?: number;
  type: IssuesTypes;
}

const SelectableItem: React.FC<Props> = ({ item, id, actions, projectId, type }) => {
  const {
    actions: { isChecked, selectOne },
    selectors: { selectionMode },
  } = useSelection({ projectId, tab: type });

  const { isSwiped, swipeCard } = useSwipe(projectId!);

  const checked = useMemo(() => isChecked(+id), [id, isChecked]);

  const ref = useRef<Swipeable>(null);

  useEffect(() => {
    if (!isSwiped(id)) {
      ref.current?.close();
    }
  });

  return (
    <SwipeableCard
      swipe={() => swipeCard(id)}
      ref={ref}
      renderActions={() => (id ? <IssueAction actions={actions || []} id={id} /> : <></>)}
      testID='comment-card'>
      <RowContainer>
        <Row isChecked={checked}>
          {selectionMode && (
            <CheckBoxWrapper>
              <Checkbox isChecked={checked} onPress={() => selectOne(id)} />
            </CheckBoxWrapper>
          )}

          <CardWrapper>{item}</CardWrapper>
        </Row>
      </RowContainer>
    </SwipeableCard>
  );
};

const CardWrapper = styled.View`
  justify-content: center;
  flex: 1;
  align-self: stretch;
`;

const RowContainer = styled.View<{ isChecked?: boolean }>`
  width: 100%;
`;

const Row = styled.View<{ isChecked?: boolean }>`
  ${(props) =>
    props.isChecked &&
    `
      background-color: ${props.theme.colors.primary.primary}16;
    `}
  border-radius: ${(props) => props.theme.metrics.borderRadius[3]}px;
  flex-direction: row;
`;

const CheckBoxWrapper = styled.View`
  padding-left: ${(props) => props.theme.metrics.spacing[1]}px;
  align-items: center;
  justify-content: center;
`;

const areEquals = (prev: Props, next: Props) => {
  return prev.id === next.id;
};

export default React.memo(SelectableItem, areEquals);
