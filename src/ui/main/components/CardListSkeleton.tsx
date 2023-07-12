import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled, { useTheme } from 'styled-components/native';

const DEFAULT_NUMBER_OF_ITEM = 7;

const Container = styled.View`
  margin: 0 ${(props) => props.theme.metrics.spacing[3]}px;
`;

interface Props {
  numberOfItem?: number;
  cardHeight?: number;
}

const CardListSkeleton: React.FunctionComponent<Props> = ({ numberOfItem = DEFAULT_NUMBER_OF_ITEM, cardHeight }) => {
  const theme = useTheme();
  const skeletons = new Array(numberOfItem).fill(0);

  return (
    <Container testID='card-list-skeleton'>
      <SkeletonPlaceholder>
        {skeletons.map((i) => (
          <SkeletonPlaceholder.Item
            width='100%'
            height={cardHeight || theme.metrics.spacing[6]}
            marginTop={theme.metrics.spacing[1]}
            borderRadius={4}
            key={i}
          />
        ))}
      </SkeletonPlaceholder>
    </Container>
  );
};

export default CardListSkeleton;
