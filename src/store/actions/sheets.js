// @flow
export const SHEETS = {
  LOAD: 'LOAD_SHEETS',
  LOADED: 'LOAD_SHEETS_SUCCESS',
  SET: 'SET_SHEET',
  UPDATE: 'UPDATE_CELL',
};

export const loadSheets = (accountId: number): Object => ({
  type: SHEETS.LOAD,
  accountId,
});

export const loadSheetsSucceeded = (sheets: Array<Array<string | number>>): Object => ({
  type: SHEETS.LOADED,
  sheets,
});

export const setSheet = (sheet: Array<Array<Object>>): Object => ({
  type: SHEETS.SET,
  sheet,
});

export const updateCell = (changes: Array<any>, index: number): Object => ({
  type: SHEETS.UPDATE,
  changes,
  index,
});
