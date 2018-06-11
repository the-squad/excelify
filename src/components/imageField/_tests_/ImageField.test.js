import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import ImageField from '../ImageField';

configure({ adapter: new Adapter() });

describe('ImageField', () => {
  it('should render', () => {
    const tree = render(<ImageField />);
    expect(tree).toMatchSnapshot();
  });
});
