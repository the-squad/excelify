// @flow
export const SHEETS = {
  LOADED: 'LOAD_SHEETS_SUCCESS',
  UPDATE: 'UPDATE_CELL',
};

export const loadSheetsSucceeded = (sheets: Array<Object>): Object => ({
  type: SHEETS.LOADED,
  sheets,
});

export const updateCell = (changes: Array<any>, index: number): Object => ({
  type: SHEETS.UPDATE,
  changes,
  index,
});
