// @flow
import { SHEETS } from '../actions/sheets';

import { generateTable } from '../../utils/generateTable';
import Sheets from '../../fakeData.json';

const initialState = {
  sheets: Sheets.sheets.map(sheet => ({
    name: sheet.name,
    date: sheet.date,
    image: sheet.image,
    sheet: generateTable(sheet.sheet),
  })),
};

export default (state = initialState, { type, ...payload }) => {
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
