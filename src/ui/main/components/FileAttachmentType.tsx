import React from 'react';
import styled from 'styled-components/native';
import { FileExtension } from '../assets/icons';
import { extensionMatrix, ExtensionMatrix } from '../constants/ExtensionFilesConst';
import { normalize } from '../utils/scalingUtils';
import Label from './Label';

interface Props {
  filename: string;
}

const FileAttachmentType: React.FC<Props> = ({ filename }) => {
  const showExtension = () => {
    return filename.split('.').length > 1;
  };

  const getCurrentExtension = () => {
    const currentExtension = filename.split('.').pop()?.toUpperCase();

    if (!currentExtension) {
      return 'Other';
    }

    return currentExtension.length > 5 ? `${currentExtension.substring(0, 4)}...` : currentExtension;
  };

  const getMatrixExtension = (): ExtensionMatrix | undefined => {
    let extensionRes = extensionMatrix.find((m) => m.extType === 'Other');

    const parts = filename.split('.');
    if (parts.length === 1) {
      return extensionRes;
    }

    extensionMatrix.forEach((matrix) => {
      if (matrix.extVariables?.includes(getCurrentExtension())) {
        extensionRes = matrix;
      }
    });

    return extensionRes;
  };

  const currentExtensionMatrix: ExtensionMatrix | undefined = getMatrixExtension();

  return (
    <Wrapper testID='file-extension'>
      <FileExtension />
      {showExtension() && (
        <ExtensionWrapper testID='extension-wrapper'>
          <ExtensionBox color={currentExtensionMatrix?.color}>
            <ExtensionLabel variant={{ type: 'attachmentExt' }}>{getCurrentExtension()}</ExtensionLabel>
          </ExtensionBox>
        </ExtensionWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  min-width: ${normalize(24)}px;
  margin-horizontal: ${(props) => props.theme.metrics.spacing[0]}px;
  height: ${normalize(18)}px;
`;

const ExtensionWrapper = styled.View`
  height: ${normalize(10)}px;
  position: absolute;
  bottom: 0px;
  left: ${normalize(6)}px;
`;

const ExtensionBox = styled.View<{ color: string | undefined }>`
  background-color: ${(props) => props.color};
  height: ${normalize(13)}px;
  padding-horizontal: 2px;
  border-radius: ${normalize(3)}px;
  border: 1px solid ${(props) => props.theme.colors.grey.lighter};
`;

const ExtensionLabel = styled(Label)`
  color: white;
`;

export default FileAttachmentType;
