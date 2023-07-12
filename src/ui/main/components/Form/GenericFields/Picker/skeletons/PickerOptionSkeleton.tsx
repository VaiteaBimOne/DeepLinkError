import React from 'react';
import { ScrollView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from 'ui/main/utils/scalingUtils';

const PickerOptionSkeleton = () => {
  const theme = useTheme();

  const WorkflowSeperatorSkeleton = () => {
    return (
      <Container>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={'100%'} height={normalize(50)} borderRadius={theme.metrics.borderRadius[4]} />
        </SkeletonPlaceholder>
      </Container>
    );
  };
  return (
    <ScrollView
      testID='workflows-skeleton'
      alwaysBounceVertical={false}
      bounces={false}
      scrollIndicatorInsets={{ right: 1 }}
      style={{ width: '100%' }}>
      <SkeletonContainer>
        <WorkflowSeperatorSkeleton />
        <WorkflowSeperatorSkeleton />
        <WorkflowSeperatorSkeleton />
        <WorkflowSeperatorSkeleton />
      </SkeletonContainer>
    </ScrollView>
  );
};

const Container = styled.View<{ withSeparator?: boolean }>`
  padding-vertical: ${({ theme: { metrics } }) => metrics.spacing[1]}px;
  flex: 1;
`;

const SkeletonContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.metrics.spacing[2]}px;
`;

export default PickerOptionSkeleton;
