import React from 'react';
import { Platform, Image, ScrollView, Pressable } from 'react-native';
import PhotoView from 'react-native-photo-view';
import styled from 'styled-components/native';
import { Data } from 'ui/main/components/Gallery/Gallery';

interface Props {
  item: Data;
  onPress: () => void;
}

const Slide = ({ item, onPress }: Props) => {
  const testID = `image-${item.id}`;

  return (
    <Container testID={testID} onPress={onPress}>
      {Platform.OS === 'android' ? (
        <PhotoView
          source={{ uri: item.image }}
          maximumZoomScale={4}
          zoomScale={1}
          androidScaleType='fitCenter'
          resizeMode='contain'
          style={[styles.scrollViewC]}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
          maximumZoomScale={4}
          zoomScale={1}
          style={[{ flex: 1 }]}
          showsVerticalScrollIndicator={false}>
          <Blip source={{ uri: item.image }} accessible={true} resizeMode='contain' />
        </ScrollView>
      )}
    </Container>
  );
};

const Blip = styled(Image)`
  top: ${(props) => props.theme.metrics.spacing[2]}px;
  width: ${(props) => props.theme.metrics.window.width}px;
  height: ${(props) => props.theme.metrics.window.height}px;
`;

const Container = styled(Pressable)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.metrics.window.width}px;
  height: ${(props) => props.theme.metrics.window.height}px;
`;

const styles = {
  scrollViewC: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? -32 : 70,
    width: '100%',
  },
};

export default Slide;
