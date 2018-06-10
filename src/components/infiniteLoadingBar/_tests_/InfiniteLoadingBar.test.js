import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import InfiniteLoadingBar from '../InfiniteLoadingBar';

configure({ adapter: new Adapter() });

describe('InfiniteLoadingBar', () => {
  it('should render', () => {
    const component = <InfiniteLoadingBar />;
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });
});
