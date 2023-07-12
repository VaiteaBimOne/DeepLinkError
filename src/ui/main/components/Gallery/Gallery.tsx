import { RootState, useAppDispatch } from 'core/redux/store';
import { setIndex } from 'core/viewpoints/state/viewpointReducers';
import { selectIndexGallery } from 'core/viewpoints/state/viewpointSelectors';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Slide from 'ui/main/components/Gallery/Slide';
import theme from 'ui/main/theme';

export interface Data {
  id: string;
  image: string;
}

interface Props {
  testID?: string;
  data: Data[];
  setCurrentImage?: (index: number) => void;
  onSwipe: (index: number) => void;
  onPress: () => void;
  backgroundColor?: string;
  issueId?: string;
  initialNumToRender?: number;
  initialPaginationSize?: number;
}

const Gallery: React.FunctionComponent<Props> = ({ onSwipe, backgroundColor, data, onPress, testID, issueId = '' }: Props) => {
  const dispatch = useAppDispatch();
  const [initialScrolled, setInitialScrolled] = useState<boolean>(false);
  const width = useMemo(() => Dimensions.get('window').width, []);

  const index = useSelector((state: RootState) => selectIndexGallery(state, issueId));

  const swiper = useRef<FlatList<Data>>(null);

  const onScrollEnd = useCallback(
    (e: any) => {
      const contentOffset = e.nativeEvent.contentOffset;
      const viewSize = e.nativeEvent.layoutMeasurement;
      const pageNum = Math.floor(contentOffset.x / viewSize.width);
      dispatch(setIndex({ indexGallery: pageNum, issueId }));
      onSwipe(pageNum);
    },
    [onSwipe, dispatch, issueId],
  );

  const getItemLayout = useCallback(
    (data: Data[] | null | undefined, index: number) => {
      return {
        index,
        length: width,
        offset: width * index,
      };
    },
    [width],
  );

  const goTo = useCallback((index: number) => {
    if (index === -1) {
      return;
    }
    swiper.current?.scrollToIndex({ animated: false, index: index });
    setInitialScrolled(true);
  }, []);

  useEffect(() => {
    goTo(index || 0);
  }, [goTo, index, onPress]);

  const _renderImage = useCallback(
    (item: any) => {
      return <Slide key={item.id} onPress={onPress} {...item} />;
    },
    [onPress],
  );

  return (
    <Container backgroundColor={backgroundColor || '#000'}>
      {!initialScrolled && (
        <Backdrop>
          <ActivityIndicator size='large' color={theme.colors.white} />
        </Backdrop>
      )}
      <FlatList
        testID={testID}
        style={{
          alignSelf: 'stretch',
          flex: 1,
          width: Dimensions.get('window').width,
        }}
        initialNumToRender={5}
        maxToRenderPerBatch={20}
        windowSize={20}
        data={data || []}
        extraData={index}
        horizontal
        ref={swiper}
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={getItemLayout}
        renderItem={(img) => _renderImage(img)}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const Container = styled(View)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const Backdrop = styled(View)`
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.black};
  z-index: ${(props) => props.theme.metrics.zIndex.groundFloor};
  padding: ${(props) => props.theme.metrics.spacing[3]}px;
`;

export default Gallery;
