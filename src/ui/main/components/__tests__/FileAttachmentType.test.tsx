import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import FileAttachmentType from '../FileAttachmentType';

const DEFAULT_FILE_NAME = 'testFilename.png';

const setup = (filename?: string) => {
  const render = createRender({});
  return () => render(<FileAttachmentType filename={filename || DEFAULT_FILE_NAME} />);
};

describe('FileAttachmentType', () => {
  let render: () => RenderAPI;

  it('should render the file icon', () => {
    render = setup();
    const { getByTestId } = render();

    const id = getByTestId('file-extension');

    expect(id).toBeTruthy();
  });

  it('should render the extension with defined extension', () => {
    render = setup();
    const { getByTestId } = render();

    const id = getByTestId('extension-wrapper');

    expect(id).toBeTruthy();
  });

  it('should not render the extension without defined extension', () => {
    render = setup('FileWithoutExtension');
    const { queryByTestId } = render();

    const id = queryByTestId('extension-wrapper');

    expect(id).toBeFalsy();
  });
});
