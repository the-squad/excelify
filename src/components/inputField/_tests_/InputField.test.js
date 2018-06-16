import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import InputField from '../InputField';

configure({ adapter: new Adapter() });

describe('InputField', () => {
  it('should render', () => {
    const tree = render(<InputField placeholder="test" />);
    expect(tree).toMatchSnapshot();
  });
});
