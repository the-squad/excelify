import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import Header from '../Header';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render', () => {
    const tree = render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
