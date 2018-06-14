// @flow
export const SHEETS = {
  SET: 'SET_SHEET',
};

export const setSheet = (sheet: Array<Array<Object>>) => ({
  type: SHEETS.SET,
  sheet,
});
