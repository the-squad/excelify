import { COLORS_VALUES as colors } from './Colors';
import breakpoints from './Breakpoints';
import Space from './Space';
import {
  FONT_SIZES as fontSizes,
  LINE_HEIGHTS as lineHeights,
  FONT_WEIGHTS as fontWeights,
} from './Typography';

const letterSpacings = {
  normal: 'normal',
  caps: '0.25em',
};

// border-radius
// const radii = [0, 2, 4, 8];

// const borders = [0, '1px solid', '2px solid'];

// const shadows = [`0 1px 2px 0 ${colors.text}`, `0 1px 4px 0 ${colors.text}`];

const theme = {
  breakpoints,
  colors,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  Space,
  // radii,
  // borders,
  // shadows,
};

export default theme;
