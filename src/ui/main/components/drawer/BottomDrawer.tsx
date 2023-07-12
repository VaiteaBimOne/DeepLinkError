import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import styled, { css } from 'styled-components/native';
import Label from 'ui/main/components/Label';
import { normalize } from 'ui/main/utils/scalingUtils';
import BottomDrawerHeaderWithCancel from 'ui/rfiSubmittal/rfis/components/BottomDrawerHeaderWithCancel';
import DrawerHandle from './DrawerHandle';

const ModalView = styled(SafeAreaView)<{ modalHeight?: number }>`
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  padding-bottom: ${(props) => props.theme.metrics.spacing[3]}px;

  ${(props) =>
    props.modalHeight &&
    css`
      height: 100%;
      max-height: ${normalize(props.modalHeight)}px;
    `}
`;
export interface ButtonProps {
  action: () => void;
  Icon?: React.FC<SvgProps>;
  testID?: string;
  key: string;
  text?: string;
  children?: React.ReactNode;
  visible?: boolean;
}

interface Props {
  title: string;
  testID?: string;
  children?: React.ReactNode;
  modalHeight?: number;
  withCancel?: boolean;
}

export interface DrawerRef {
  open: () => void;
  close: () => void;
}

const BottomDrawer: React.FunctionComponent<React.PropsWithoutRef<Props> & React.RefAttributes<DrawerRef>> = React.forwardRef<DrawerRef, Props>(
  ({ title, testID, children, modalHeight, withCancel }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    useImperativeHandle(ref, () => ({
      close: () => {
        setModalVisible(false);
      },
      open: () => {
        setModalVisible(true);
      },
    }));

    return (
      <Modal
        testID={testID}
        useNativeDriver={false}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
        hasBackdrop={true}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(!modalVisible)}
        swipeDirection={['down']}
        style={styles.view}
        propagateSwipe
        avoidKeyboard>
        <ModalView modalHeight={modalHeight}>
          <DrawerHandle />
          {withCancel ? (
            <BottomDrawerHeaderWithCancel label={title} hideModal={() => setModalVisible(!modalVisible)} />
          ) : (
            <Label variant={{ alignment: 'center', type: 'h3' }} style={{ textAlign: 'center' }}>
              {title}
            </Label>
          )}
          {children}
        </ModalView>
      </Modal>
    );
  },
);

export default BottomDrawer;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
