import { RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import { FileDrawer, FileDrawerProps } from '../FileDrawer';

const A_TITLE = 'drawer';
const ON_UPLOAD = jest.fn();

const setup = (props: Partial<FileDrawerProps>) => {
  const render = createRender({});

  return () => render(<FileDrawer imageOnly={props.imageOnly} title={A_TITLE} onUpload={ON_UPLOAD} />);
};

describe('File drawer', () => {
  let render: () => RenderAPI;

  beforeEach(() => {
    render = setup({});
  });

  it('should render the drawer', () => {
    const { getByText } = render();

    const title = getByText(A_TITLE);

    expect(title).toBeTruthy();
  });

  it('should render the open camera button', () => {
    const { getByTestId } = render();

    const openCameraBtn = getByTestId('openCamera-btn');

    expect(openCameraBtn).toBeTruthy();
  });

  it('should render the pick from document', () => {
    const { getByTestId } = render();

    const galleryBtn = getByTestId('pickFile-btn');

    expect(galleryBtn).toBeTruthy();
  });

  describe('when the modal is Image only', () => {
    beforeEach(() => {
      render = setup({ imageOnly: true });
    });

    it('should not render the pick from file button', () => {
      const { queryByTestId } = render();

      const pickFileBtn = queryByTestId('pickFile-btn');

      expect(pickFileBtn).toBeFalsy();
    });
  });

  describe('when the modal is not Image only', () => {
    beforeEach(() => {
      render = setup({ imageOnly: false });
    });

    it('should  render the pick from file button', () => {
      const { getByTestId } = render();

      const pickFileBtn = getByTestId('pickFile-btn');

      expect(pickFileBtn).toBeTruthy();
    });
  });
});
