import { selectProject } from 'core/projects/state/projectSelectors';
import { RootState } from 'core/redux/store';
import { RfiSubmittalType } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import { useRfiSubmittalType } from 'core/rfiSubmittal/generic/hooks/useRfiSubmittalType';
import useSortAndFilters from 'core/rfiSubmittal/generic/hooks/useSortAndFilters';
import React from 'react';
import { Platform, StyleProp, TextStyle, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useSelector } from 'react-redux';
import Label, { LabelVariant } from 'ui/main/components/Label';
import { normalize } from '../utils/scalingUtils';

interface Props {
  variant?: LabelVariant;
  style?: StyleProp<TextStyle>;
  text: string | null | undefined;
  lineHeight?: number;
  margin?: number;
}

const HighlightedLabel: React.FC<Props> = ({ text, style, variant, margin, lineHeight = 18 }) => {
  const highlighted: any[] = [];

  const { project } = useSelector((state: RootState) => selectProject(state));

  const {
    selectors: { rfiSubmittalType },
  } = useRfiSubmittalType();

  const {
    selectors: { rfiQuery, submittalQuery },
  } = useSortAndFilters({ projectId: project?.id || 0 });

  const skipHighlight = () => {
    return (
      (text && text.trim().length === 0) ||
      (rfiSubmittalType === RfiSubmittalType.RFI && rfiQuery.length === 0) ||
      (rfiSubmittalType === RfiSubmittalType.SUBMITTAL && submittalQuery.length === 0)
    );
  };

  if (skipHighlight()) {
    return (
      <Label variant={variant} style={[style, {}]} numberOfLines={1}>
        {text}
      </Label>
    );
  }

  const getMarginBottom = () => {
    if (margin) {
      return margin;
    }

    if (isTablet()) {
      return Platform.OS == 'ios' ? -4 : -8;
    }

    return Platform.OS == 'ios' ? -4 : -4;
  };

  // Regular expression pattern to split the string by <b></b> tags
  const pattern = /<b>|<\/b>/g;
  const result: string[] = text?.split(pattern) || [];

  result.forEach((stringSection, i) => {
    if (stringSection.toUpperCase().trim() === (rfiSubmittalType === RfiSubmittalType.RFI ? rfiQuery : submittalQuery)) {
      highlighted.push(
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} key={i}>
          <View
            style={{
              backgroundColor: '#FFE4AF',
              borderColor: '#FFCF74',
              borderRadius: 4,
              borderWidth: 1,
              marginBottom: getMarginBottom(),
            }}>
            <Label variant={variant} style={{ lineHeight: normalize(lineHeight) }}>
              {stringSection}
            </Label>
          </View>
        </View>,
      );
    } else {
      highlighted.push(
        <Label variant={variant} style={[style, {}]} numberOfLines={1}>
          {stringSection}
        </Label>,
      );
    }
  });

  return <>{highlighted.map((stringSection) => stringSection)}</>;
};

export default React.memo(HighlightedLabel);
