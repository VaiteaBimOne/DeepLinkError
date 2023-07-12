import { DOWNLOAD_ATTACHMENT_PERMISSION_RESULT as PERMISSION_RESULT } from 'core/attachments/domain/AttachmentNativePermission';
import useDownloadPermissions from 'core/attachments/hooks/useDownloadPermission';
import Monitoring from 'core/main/services/Monitoring';
import OrientationService from 'core/main/services/OrientationService';
import { useState } from 'react';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset, CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ImageLibraryOptions } from 'react-native-image-picker/src/types';

export type File = {
  id?: string;
  uri: string;
  url?: string;
  type: string;
  name: string;
  size: number;
  fileCopyUri?: string;
};

interface FilePickerActions {
  pickImageFromGallery: () => void;
  pickImageFromCamera: () => void;
  pickFromDocument: () => void;
}

interface ReturnType {
  type: string;
  value?: DocumentPickerResponse;
  values?: DocumentPickerResponse[];
  error?: Error & { code?: string };
}

export interface FilePickerHook {
  actions: FilePickerActions;
}

export interface FilePickerProps {
  onUpload: (file: File) => void;
}

const useFilePickers = ({ onUpload }: FilePickerProps): FilePickerHook => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const {
    actions: { permissionAction },
    selectors: { permission },
  } = useDownloadPermissions();

  const handleResponse = (res: ImagePickerResponse) => {
    res.assets?.forEach((response) => {
      onUpload(assetToFile(response));
    });
  };

  const pickImageFromGallery = (): void => {
    if (isPickerOpen) {
      return;
    }

    setIsPickerOpen(true);
    Monitoring.trackEvent('Opened Gallery Picker');
    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    try {
      // fix for library not opening on IOS
      setTimeout(() => {
        launchImageLibrary(options, handleResponse).then((response) => {
          if (response.errorCode) {
            throw new Error(response.errorMessage);
          }
        });
      }, 500);
    } catch (e) {
      Monitoring.trackError(e);
    } finally {
      setIsPickerOpen(false);
    }
  };

  const handlePermission = (callback: () => void) => {
    if (permission !== PERMISSION_RESULT.GRANTED) {
      permissionAction(permission, callback);
    } else {
      callback();
    }
  };

  const pickImageFromCamera = (): void => {
    if (isPickerOpen) {
      return;
    }

    setIsPickerOpen(true);
    const options: CameraOptions = { mediaType: 'photo', presentationStyle: 'fullScreen', saveToPhotos: true };
    try {
      // fix for library not opening on IOS
      setTimeout(() => {
        launchCamera(options, (response) => {
          // Prevent ipad from keeping camera orientation
          OrientationService.lockIPadToPortrait();
          handleResponse(response);
        }).then((response) => {
          if (response.errorCode) {
            throw new Error(response.errorMessage);
          }
        });
      }, 500);
    } catch (e) {
      Monitoring.trackError(e);
    } finally {
      setIsPickerOpen(false);
    }
  };

  const pickFromDocument = async (): Promise<ReturnType> => {
    if (isPickerOpen) {
      return { type: 'Prevented' };
    }
    setIsPickerOpen(true);
    Monitoring.trackEvent('Opened Document Picker');
    try {
      //fix for library not opening on IOS
      await new Promise((r) => setTimeout(r, 500));

      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      onUpload(responseToFile(response));

      return { type: 'Success', value: response };
    } catch (e: any) {
      Monitoring.trackError(e);
      if (DocumentPicker.isCancel(e)) {
        return { type: 'Cancelled' };
      } else {
        return { error: e, type: 'Failure' };
      }
    } finally {
      setIsPickerOpen(false);
    }
  };

  return {
    actions: { pickFromDocument, pickImageFromCamera: () => handlePermission(pickImageFromCamera), pickImageFromGallery },
  };
};

const assetToFile = ({ uri, type, fileName, fileSize }: Asset): File => {
  return {
    name: fileName || '',
    size: fileSize || 0,
    type: type || '',
    uri: uri || '',
  };
};

const responseToFile = ({ uri, type, name, size }: DocumentPickerResponse): File => {
  return {
    name: name || '',
    size: size || 0,
    type: type || '',
    uri: uri || '',
  };
};

export default useFilePickers;
