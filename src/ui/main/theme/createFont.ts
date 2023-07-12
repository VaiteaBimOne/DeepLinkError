import { normalize } from 'ui/main/utils/scalingUtils';
import colors from './colors';

type FontFamily = 'CircularStd-Black' | 'CircularStd-Medium' | 'CircularStd-Book' | 'CircularStd-Bold';

interface Font {
  fontFamily: FontFamily;
  fontSize: number;
  lineHeight: number;
  color?: string;
  italic?: boolean;
  letterSpacing?: string;
  textDecorationLine?: 'underline' | 'line-through' | 'underline line-through';
}

function toCSS(font: Font) {
  return `
    font-family: ${font.fontFamily}
    font-size: ${normalize(font.fontSize)}px;
    line-height: ${normalize(font.lineHeight * font.fontSize)}px;
    letter-spacing: ${font.letterSpacing ? font.letterSpacing : 0};
    color: ${font.color ? font.color : colors.text};
    ${font.italic ? 'font-style: italic;' : ''}
    ${font.textDecorationLine ? `text-decoration-line: ${font.textDecorationLine};` : ''}
  `;
}

const createFont = (
  fontFamily: FontFamily,
  fontSize: number,
  lineHeight: number,
  options?: {
    color?: string;
    italic?: boolean;
    letterSpacing?: string;
    textDecorationLine?: 'underline' | 'line-through' | 'underline line-through';
  },
): string => {
  const font: Font = { fontFamily, fontSize, lineHeight, ...options };
  return toCSS(font);
};

export default createFont;
