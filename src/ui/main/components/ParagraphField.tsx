import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import styled from 'styled-components/native';
import HighlightedLabel from './HighlightedLabel';
import Label from './Label';

const StyledLabel = styled(Label)`
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.colors.primary.primary};
`;

export interface Props {
  value: string;
  showMoreLength?: number;
  maxLine?: number;
}

const TRUNK_DESCRIPTION_LENGTH = 200;
const FIXED_LINE_HEIGHT = 18;
const MAX_LINES = 5;
const MAX_LINES_CARACTERS = 20;

const ParagraphField: React.FunctionComponent<Props> = ({ value, showMoreLength = TRUNK_DESCRIPTION_LENGTH, maxLine = MAX_LINES }) => {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const [maxCaracters, setMaxCaracters] = useState(showMoreLength);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (numberOfLines > maxLine) {
      setShouldShowMore(true);
      setMaxCaracters(MAX_LINES_CARACTERS);
    }

    if (value.length > showMoreLength) {
      setShouldShowMore(true);
      setMaxCaracters(showMoreLength);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, numberOfLines]);

  if (shouldShowMore) {
    const formatedValue = isShowingAll ? value : `${value.slice(0, maxCaracters)}...`;
    return (
      <View>
        <Label>
          <HighlightedLabel text={formatedValue} />
        </Label>

        <StyledLabel onPress={() => setIsShowingAll(!isShowingAll)} variant={{ type: 'link' }}>
          {isShowingAll ? t('showLess') : t('showMore')}
        </StyledLabel>
      </View>
    );
  }

  return (
    <Label onLayout={(e: any) => setNumberOfLines(e.nativeEvent.layout.height / FIXED_LINE_HEIGHT)}>
      <HighlightedLabel text={value} />
    </Label>
  );
};

export default ParagraphField;
