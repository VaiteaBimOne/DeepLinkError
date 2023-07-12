import colors from './colors';
import createFont from './createFont';

const lineHeight = {
  large: 1.6,
  medium: 1.42857143,
  small: 1.33,
  xLarge: 1.7,
  xSmall: 1,
};
const fontSize = {
  attachmentExt: 8,
  attribute: 16,
  body: 14,
  forceUpdateTitle: 21,
  h1: 32,
  h2: 21,
  h3: 19,
  h4: 14,
  h5: 12,
  link: 14,
  small: 10,
  subheading: 11,
};
const letterSpacing = {
  attachmentExt: '-0.4px',
  subheading: '0.8px',
};

const fonts = {
  text: {
    attachmentError: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
    },
    attachmentExt: {
      center: createFont('CircularStd-Bold', fontSize.attachmentExt, lineHeight.small, { letterSpacing: letterSpacing.attachmentExt }),
      left: createFont('CircularStd-Bold', fontSize.attachmentExt, lineHeight.small, { letterSpacing: letterSpacing.attachmentExt }),
    },
    attachmentFile: {
      center: createFont('CircularStd-Book', fontSize.body, lineHeight.xLarge),
      left: createFont('CircularStd-Book', fontSize.body, lineHeight.xLarge),
    },
    attribute: {
      center: createFont('CircularStd-Book', fontSize.attribute, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.attribute, lineHeight.small),
    },
    avatar: {
      center: createFont('CircularStd-Medium', fontSize.small, lineHeight.medium),
      left: createFont('CircularStd-Medium', fontSize.small, lineHeight.medium),
    },
    badge: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.black }),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.black }),
    },
    body: {
      center: createFont('CircularStd-Book', fontSize.body, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.body, lineHeight.small),
    },
    buttonOpacityLabel: {
      center: createFont('CircularStd-Medium', fontSize.body, lineHeight.small, { color: colors.grey.lightest }),
      left: createFont('CircularStd-Medium', fontSize.body, lineHeight.small, { color: colors.grey.lightest }),
    },
    commentAuthor: {
      center: createFont('CircularStd-Medium', fontSize.h4, lineHeight.small),
      left: createFont('CircularStd-Medium', fontSize.h4, lineHeight.small),
    },
    commentHeader: {
      center: createFont('CircularStd-Medium', fontSize.h4, lineHeight.small),
      left: createFont('CircularStd-Medium', fontSize.h4, lineHeight.small),
    },
    commentHours: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
    },
    error: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small),
    },
    forceUpdateBody: {
      center: createFont('CircularStd-Book', 16, lineHeight.medium),
      left: createFont('CircularStd-Book', 16, lineHeight.medium),
    },
    forceUpdateTitle: {
      center: createFont('CircularStd-Bold', fontSize.forceUpdateTitle, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.forceUpdateTitle, lineHeight.medium),
    },
    h1: {
      center: createFont('CircularStd-Bold', fontSize.h1, lineHeight.large),
      left: createFont('CircularStd-Bold', fontSize.h1, lineHeight.large),
    },
    h2: {
      center: createFont('CircularStd-Medium', fontSize.h2, lineHeight.medium),
      left: createFont('CircularStd-Medium', fontSize.h2, lineHeight.medium),
    },

    h3: {
      center: createFont('CircularStd-Black', fontSize.h3, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.h3, lineHeight.medium),
    },
    h3Bold: {
      center: createFont('CircularStd-Bold', fontSize.h3, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.h3, lineHeight.medium),
    },
    h4: {
      center: createFont('CircularStd-Bold', fontSize.h4, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.h4, lineHeight.medium),
    },
    h5: {
      center: createFont('CircularStd-Bold', fontSize.h5, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.h5, lineHeight.medium),
    },
    link: {
      center: createFont('CircularStd-Book', fontSize.link, lineHeight.small, {
        color: colors.primary.primary,
      }),
      left: createFont('CircularStd-Book', fontSize.link, lineHeight.small, {
        color: colors.primary.primary,
      }),
    },
    name: {
      center: createFont('CircularStd-Bold', fontSize.body, lineHeight.medium),
      left: createFont('CircularStd-Bold', fontSize.body, lineHeight.medium),
    },
    notes: {
      center: createFont('CircularStd-Book', fontSize.subheading, lineHeight.small),
      left: createFont('CircularStd-Book', fontSize.subheading, lineHeight.small),
    },
    rfiHeader: {
      center: createFont('CircularStd-Book', fontSize.attribute, lineHeight.small, {
        color: colors.pitchBlack,
        letterSpacing: letterSpacing.subheading,
      }),
      left: createFont('CircularStd-Book', fontSize.attribute, lineHeight.small, {
        color: colors.pitchBlack,
        letterSpacing: letterSpacing.subheading,
      }),
    },
    selectLabelOption: {
      center: createFont('CircularStd-Medium', fontSize.h5, lineHeight.small, { color: colors.black }),
      left: createFont('CircularStd-Medium', fontSize.h5, lineHeight.small, { color: colors.black }),
    },
    selectSearchSubtext: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.grey.medium }),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.grey.medium }),
    },
    selectSubtextOption: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.grey.lightest }),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.grey.lightest }),
    },
    subheading: {
      center: createFont('CircularStd-Black', fontSize.subheading, lineHeight.small, { letterSpacing: letterSpacing.subheading }),
      left: createFont('CircularStd-Black', fontSize.subheading, lineHeight.small, { letterSpacing: letterSpacing.subheading }),
    },
    subscriptionText: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.black }),
      left: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, { color: colors.black }),
    },

    titleField: {
      center: createFont('CircularStd-Book', fontSize.h5, lineHeight.small, {
        color: '#676767',
      }),
      left: createFont('CircularStd-Book', fontSize.small, lineHeight.small, {
        color: colors.pitchBlack,
        letterSpacing: letterSpacing.subheading,
      }),
    },
  },
};

export default fonts;
