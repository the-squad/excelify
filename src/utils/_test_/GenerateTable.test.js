import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import { generateTable, removeRowCount } from '../GenerateTable';

configure({ adapter: new Adapter() });

describe('GenerateTable', () => {
  it('should generate table correctly', () => {
    const data = [[1], [3]];
    const table = generateTable(data);

    expect(table.length).toEqual(27);
    expect(table[0].length).toEqual(27);
  });

  it('should remove row number cell', () => {
    let row = [0, 1, 3];
    row = removeRowCount(row);
    expect(row).toEqual([1, 3]);
  });
});
