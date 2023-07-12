import { fireEvent, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { createRender } from 'ui/testUtils/renderUtils';
import ParagraphField, { Props } from '../ParagraphField';

const A_LABEL = 'Lorem ipsum dolor sit amet';

const setup = (props: Props) => {
  const render = createRender({});
  return () => render(<ParagraphField {...props} />);
};

describe('ParagraphField', () => {
  let render: () => RenderAPI;

  describe('given a short value', () => {
    beforeEach(() => {
      render = setup({ value: A_LABEL });
    });

    it('should display the value', () => {
      const { getByText } = render();

      const component = getByText(A_LABEL);

      expect(component).toBeTruthy();
    });

    it('should not display the show more button', () => {
      const { queryByText } = render();

      const showMoreComponent = queryByText('showMore');

      expect(showMoreComponent).toBeFalsy();
    });
  });

  describe('given a value longer than the showMoreLength', () => {
    const showMoreLength = 5;

    beforeEach(() => {
      render = setup({ showMoreLength, value: A_LABEL });
    });

    it('should display part of the value', () => {
      const { getByText } = render();

      const component = getByText(`${A_LABEL.slice(0, showMoreLength)}...`);

      expect(component).toBeTruthy();
    });

    it('should display the show more button', () => {
      const { getByText } = render();

      const showMoreComponent = getByText('Show More');

      expect(showMoreComponent).toBeTruthy();
    });

    describe('when pressing the show more button', () => {
      let result: RenderAPI;

      beforeEach(() => {
        result = render();

        const showMoreComponent = result.getByText('Show More');

        fireEvent(showMoreComponent, 'onPress');
      });

      it('should display all the text', async () => {
        const component = await result.findByText(A_LABEL);

        expect(component).toBeTruthy();
      });

      it('should display the show less button', async () => {
        const showMoreComponent = await result.findByText('Show Less');

        expect(showMoreComponent).toBeTruthy();
      });
    });
  });
});
