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
