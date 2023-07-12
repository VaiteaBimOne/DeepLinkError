import React, { useState } from 'react';
import { StyleProp, View } from 'react-native';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgProps } from 'react-native-svg';

export interface Props {
  testID?: string;
  uri?: string;
  width: number;
  height: number;
  borderRadius?: number;
  DefaultSvgImage?: React.FC<SvgProps>;
  isReadyToLoad?: boolean;
  style?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  resizeMode?: ResizeMode;
}

const ImageWithLoading: React.FunctionComponent<Props> = ({
  testID,
  uri,
  width,
  height,
  borderRadius,
  DefaultSvgImage,
  style,
  isReadyToLoad = true,
  children,
  loadingComponent,
  resizeMode,
}) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  const shouldShowDefaultImage = (error || !uri) && !loading;

  if (!isReadyToLoad) {
    return (
      <View testID='skeleton'>
        {loadingComponent ? (
          loadingComponent
        ) : (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection='column' width={width} height={height} />
          </SkeletonPlaceholder>
        )}
      </View>
    );
  } else {
    return (
      <FastImage
        resizeMode={resizeMode}
        testID={testID || 'image'}
        source={{ uri }}
        style={[{ borderRadius, height, width }, style]}
        onLoadStart={() => setIsLoading(false)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsError(true)}
        onLoad={() => setIsError(false)}>
        {loading && (
          <>
            {loadingComponent ? (
              loadingComponent
            ) : (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection='column' width={width} height={height} />
              </SkeletonPlaceholder>
            )}
          </>
        )}
        {children}
        {shouldShowDefaultImage && DefaultSvgImage && (
          <View testID='default-image'>
            <DefaultSvgImage width={width} height={height} style={{ borderRadius: borderRadius }} />
          </View>
        )}
      </FastImage>
    );
  }
};

const isEquals = (prevProps: Props, nextProps: Props) => {
  return prevProps.uri === nextProps.uri;
};

export default React.memo(ImageWithLoading, isEquals);
