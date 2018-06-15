export const FONT_TYPES = {
  HERO_TITLE: 'heroTitle',
  SUPER_TITLE: 'superTitle',
  TITLE: 'title',
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  BODY: 'body',
  CAPTION: 'caption',
};

export const FONT_SIZES = {
  // Breakpoints: ['400px', '576px', '786px', '992px']
  [FONT_TYPES.HERO_TITLE]: ['42px', '42px', '42x', '60px'],
  [FONT_TYPES.SUPER_TITLE]: ['32px', '32px', '32x', '30px'],
  [FONT_TYPES.TITLE]: ['21px', '21px', '20px', '20px'],
  [FONT_TYPES.HEADING]: ['19px', '19px', '18px', '18px'],
  [FONT_TYPES.SUBHEADING]: ['17px', '17px', '16px', '16px'],
  [FONT_TYPES.BODY]: ['15px', '15px', '14px', '14px'],
  [FONT_TYPES.CAPTION]: ['13px', '13px', '12px', '12px'],
};

export const FONT_WEIGHTS = {
  SEMI_BOLD: 600,
  NORMAL: 500,
  LIGHT: 400,
  SUPER_LIGHT: 300,
};

export const LINE_HEIGHTS = {
  [FONT_TYPES.HERO_TITLE]: '30px',
  [FONT_TYPES.SUPER_TITLE]: '30px',
  [FONT_TYPES.TITLE]: '24px',
  [FONT_TYPES.HEADING]: '24px',
  [FONT_TYPES.SUBHEADING]: '24px',
  [FONT_TYPES.BODY]: '24px',
  [FONT_TYPES.CAPTION]: '24px',
};
