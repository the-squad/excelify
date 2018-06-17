import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import EmptyState from '../EmptyState';

configure({ adapter: new Adapter() });

describe('EmptyState', () => {
  it('should render', () => {
    const tree = render(<EmptyState />);
    expect(tree).toMatchSnapshot();
  });
});
