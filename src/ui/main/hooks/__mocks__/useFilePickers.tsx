import { FilePickerHook, FilePickerProps } from 'ui/main/hooks/useFilePickers';

const useFilePickers = ({ onUpload }: FilePickerProps): FilePickerHook => {
  const pickImageFromGallery = jest.fn().mockImplementation(onUpload);

  const pickImageFromCamera = jest.fn().mockImplementation(onUpload);

  const pickFromDocument = jest.fn().mockImplementation(onUpload);

  return {
    actions: { pickFromDocument, pickImageFromCamera, pickImageFromGallery },
  };
};

export default useFilePickers;
