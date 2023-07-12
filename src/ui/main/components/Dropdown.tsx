import React, { useImperativeHandle, useState } from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

export interface DropdownRef {
  open: () => void;
  close: () => void;
}

interface MenuItemProps {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  testId?: string;
}

export interface Props {
  menuItems: MenuItemProps[];
  style?: StyleProp<ViewStyle>;
  modalContentWidth?: number;
  shouldAddInsets?: boolean;
}

const Dropdown: React.FunctionComponent<React.PropsWithoutRef<Props> & React.RefAttributes<DropdownRef>> = React.forwardRef<DropdownRef, Props>(
  ({ menuItems, style, modalContentWidth, shouldAddInsets = false }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      close: () => setIsVisible(false),
      open: () => setIsVisible(true),
    }));

    return (
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        coverScreen={Platform.OS === 'android'}
        backdropOpacity={0}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
        hasBackdrop
        style={[style, { position: 'absolute', top: theme.metrics.spacing[3] + (shouldAddInsets ? insets.top : 0) }]}
        isVisible={isVisible}
        onSwipeComplete={() => setIsVisible(false)}
        testID='dropdown'>
        <ModalContent width={modalContentWidth}>
          {menuItems.map((item) => (
            <MenuItem key={item.label} testID={item.testId ?? 'dropdown-item'} onPress={item.onPress} disabled={item.disabled}>
              <MenuItemLabel disabled={item.disabled}>{item.label}</MenuItemLabel>
            </MenuItem>
          ))}
        </ModalContent>
      </Modal>
    );
  },
);

export default Dropdown;

const MenuItem = styled.TouchableOpacity`
  border-bottom-color: ${(props) => props.theme.colors.grey.light};
  border-bottom-width: 1px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
  width: 100%;
`;

const MenuItemLabel = styled(Label)<{ disabled?: boolean }>`
  color: ${(props) => (props.disabled ? props.theme.colors.grey.semi : props.theme.colors.text)};
`;

export const ModalContent = styled(View)<{ width?: number }>`
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.white};
  width: ${(props) => (props.width ? normalize(props.width) : normalize(230))}px;
  elevation: 5;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 2px;
`;
