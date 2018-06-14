// @flow
import { SHEETS } from '../actions/sheets';

import { generateTable } from '../../utils/GenerateTable';
import Sheets from '../../fakeData.json';

const initialState = {
  sheets: Sheets.sheets.map(sheet => ({
    name: sheet.name,
    date: sheet.date,
    image: sheet.image,
    sheet: generateTable(sheet.sheet),
  })),
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case SHEETS.SET: {
      const sheets = state.sheets.unshift(payload.sheets);
      return {
        ...state,
        sheets,
      };
    }

    default:
      return state;
  }
};
