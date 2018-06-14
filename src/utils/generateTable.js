// @flow
const alphabetic = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Generates columns
export const generateColumns = (): Array<any> =>
  Array.from(alphabetic).map(
    (char: string): Object => ({
      name: char,
      value: char,
      width: 100,
      readOnly: true,
    }),
  );

export const generateEmptyColumn = (rowIndex: number): Array<any> =>
  Array.from(alphabetic).map(
    (_: any, index: number): Object => ({
      name: '',
      value: index === 0 ? rowIndex : '',
      readOnly: index === 0,
    }),
  );

export const generateRow = (row: Array<any>, rowIndex: number): Array<Object> =>
  Array.from(alphabetic).map(
    (_: any, index: number): Object => ({
      name: row[index],
      value: index === 0 ? rowIndex : row[index],
      readOnly: index === 0,
    }),
  );

export const removeRowCount = (row: Array<Object>): Array<Object> => {
  row.shift();
  return row;
};

export const getPureTable = (table: Array<Array<Object>>): Array<Array<string | number>> => {
  const cleanTable = [];
  const exportTable = [];

  // Remove the first row and row's number cell's
  for (let rowCounter = 1; rowCounter < 25; rowCounter += 1) {
    cleanTable.push(removeRowCount(table[rowCounter - 1]));
  }

  // Get cell's value
  cleanTable.forEach((row: Array<Array<any>>) => {
    const rowItems = row.map((column: Array<Object>) => column.value);
    exportTable.push(rowItems);
  });

  return exportTable;
};

export const generateTable = (rows: Array<Array<any>>) => {
  const table = [];
  table.push(generateColumns());
  for (let rowsCounter = 0; rowsCounter <= 25; rowsCounter += 1) {
    if (rowsCounter < rows.length) {
      table.push(generateRow(rows[rowsCounter], rowsCounter + 1));
    } else {
      table.push(generateEmptyColumn(rowsCounter + 1));
    }
  }
  return table;
};
