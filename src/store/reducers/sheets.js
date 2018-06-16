// @flow

import _ from 'lodash';

import { SHEETS } from '../actions/sheets';
import { IMAGE } from '../actions/image';

import { generateTable } from '../../utils/GenerateTable';
import { renderer } from '../../components/renderer/Renderer';

const initialState = {
  sheets: new Map(),
  sheetsState: renderer.empty(),
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case SHEETS.SET: {
      const newSheets = state.sheets;
      newSheets.set(newSheets.size, generateTable(payload.sheets));

      return {
        ...state,
        sheets: newSheets,
      };
    }

    case SHEETS.UPDATE: {
      const newSheets = _.cloneDeep(state.sheets);
      const selectedSheet = state.sheets.get(payload.index);
      const grid = selectedSheet.sheet.map(row => [...row]);

      // Looping through cell and update changed cell value
      payload.changes.forEach(({ row, col, value }) => {
        grid[row][col] = { ...grid[row][col], value, name: value };
      });

      // Update changed sheet within sheets array
      newSheets.set(payload.index, {
        ...selectedSheet,
        sheet: grid,
      });

      return {
        ...state,
        sheets: newSheets,
      };
    }

    case IMAGE.CONVERTED: {
      const newSheets = state.sheets;
      newSheets.set(state.sheets.size, payload.table);

      return {
        ...state,
        sheets: newSheets,
        sheetsState: renderer.success(),
      };
    }

    default:
      return state;
  }
};
