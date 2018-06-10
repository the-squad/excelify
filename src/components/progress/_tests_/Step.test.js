import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import Step from '../Step';

configure({ adapter: new Adapter() });

describe('Step', () => {
  it('should render when not disabled', () => {
    const tree = render(<Step isDisabled={false} title="Title" desc="Desc" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render when disabled', () => {
    const tree = render(<Step isDisabled title="Title" desc="Desc" />);
    expect(tree).toMatchSnapshot();
  });
});
