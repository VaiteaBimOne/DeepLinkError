import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { IssueListActions } from 'ui/issues/components/IssueListActions';
import { SelectionAction } from 'ui/issues/hooks/useSelectionActions';
import Button from 'ui/main/components/Button';
import AnimatedDisplay from 'ui/main/components/Display/AnimatedDisplay';
import useAnimatedLoading from 'ui/main/hooks/useAnimatedLoading';
import { normalize } from 'ui/main/utils/scalingUtils';

const Row = styled.View`
  border-top-width: 2px;
  border-top-color: ${(props) => props.theme.colors.grey.lighter};
  padding-right: ${(props) => props.theme.metrics.spacing[1]}px;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  margin-left: ${(props) => props.theme.metrics.spacing[5]}px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.default};
`;

export interface SelectionFooterProps {
  actions?: SelectionAction[];
  selectedIds: number[];
  selectionMode: boolean;
  closeSelection: () => void;
}

interface SelectionButtonProps {
  icon?: FC<SvgProps>;
  text?: string;
  action: () => void;
  identifier: string;
  disabled?: boolean;
  closeSelection: () => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({ closeSelection, icon: Icon, text, action, identifier, disabled }) => {
  const { t } = useTranslation('issues', { keyPrefix: 'selection.loading' });

  const {
    actions: { showAnimatedLoading, hideAnimatedLoading },
  } = useAnimatedLoading({ text: t(`${identifier}`) });

  return (
    <Button
      iconSize={normalize(20)}
      Icon={Icon}
      variant='subtleDefault'
      onPress={async () => {
        showAnimatedLoading();
        setTimeout(async () => {
          action();
          closeSelection();
          hideAnimatedLoading();
        }, 500);
      }}
      disabled={disabled}
      label={text}
      testID={identifier}
      key={identifier}
    />
  );
};

const SelectionFooter: React.FC<SelectionFooterProps> = ({ selectionMode, actions = [], selectedIds, closeSelection }) => {
  const iconDisabledIfNoSelection = (type: IssueListActions) => {
    if (type === IssueListActions.Sync || type === IssueListActions.Archive) {
      return selectedIds.length === 0;
    }

    return false;
  };

  return (
    <AnimatedDisplay visible={selectionMode} enterDuration={200} exitDuration={200} enter='fadeInUp' exit='fadeOutDown'>
      <Row>
        {actions.map(({ icon, text, action, key, disabled, type }: SelectionAction) => (
          <SelectionButton
            icon={icon}
            text={text}
            action={() => action(selectedIds)}
            identifier={key}
            disabled={disabled || iconDisabledIfNoSelection(type)}
            key={key}
            closeSelection={closeSelection}
          />
        ))}
      </Row>
    </AnimatedDisplay>
  );
};

export default SelectionFooter;
