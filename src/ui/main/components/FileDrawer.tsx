import React, { MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { Camera as CameraIcon, File as FileIcon, Image as ImageIcon } from 'ui/main/assets/icons';
import Label from 'ui/main/components/Label';
import BottomDrawer, { ButtonProps, DrawerRef } from 'ui/main/components/drawer/BottomDrawer';
import useFilePickers, { File } from 'ui/main/hooks/useFilePickers';
import { normalize } from 'ui/main/utils/scalingUtils';

export interface FileDrawerProps {
  onUpload: (file: File) => void;
  title: string;
  imageOnly?: boolean;
}

export const FileDrawer: React.FunctionComponent<React.PropsWithoutRef<FileDrawerProps> & React.RefAttributes<DrawerRef>> = React.forwardRef<
  DrawerRef,
  FileDrawerProps
>(({ onUpload, title, imageOnly }, ref) => {
  const theme = useTheme();
  const {
    actions: { pickImageFromCamera, pickFromDocument, pickImageFromGallery },
  } = useFilePickers({ onUpload });

  const { t } = useTranslation('issues');

  const buttons: ButtonProps[] = [
    {
      Icon: CameraIcon,
      action: pickImageFromCamera,
      key: 'openCamera-btn',
      testID: 'openCamera-btn',
      text: t('create.takeAPicture'),
    },
    {
      Icon: ImageIcon,
      action: pickImageFromGallery,
      key: 'open-gallery-btn',
      testID: 'open-gallery-btn',
      text: t('create.selectAPicture'),
    },
  ];

  if (!imageOnly) {
    buttons.push({
      Icon: FileIcon,
      action: pickFromDocument,
      key: 'pickFile-btn',
      testID: 'pickFile-btn',
      text: t('create.selectAFile'),
    });
  }

  const handleDrawerPress = (callback: () => void) => {
    (ref as MutableRefObject<DrawerRef | null>)?.current?.close();
    callback();
  };

  return (
    <BottomDrawer title={title} ref={ref} testID='bottomDrawer'>
      <ButtonContainer>
        {buttons.map(({ action, Icon, testID, text, key }) => (
          <DrawerButton key={key} onPress={() => handleDrawerPress(action)} testID={testID} style={{}}>
            {Icon && <Icon color={theme.colors.grey.dark} height={normalize(20)} width={normalize(20)} style={{ marginRight: 16 }} />}
            <Label>{text}</Label>
          </DrawerButton>
        ))}
      </ButtonContainer>
    </BottomDrawer>
  );
});

const DrawerButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.metrics.spacing[3]}px;
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  background-color: ${(props) => props.theme.colors.grey.lightest};
  max-height: ${() => normalize(70)}px;
  margin-vertical: ${(props) => props.theme.metrics.spacing[0]}px;
`;

const ButtonContainer = styled.View`
  margin-top: ${(props) => props.theme.metrics.spacing[3]}px;
  width: 100%;
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
  justify-content: space-evenly;
  flex-direction: column;
`;
