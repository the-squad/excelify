import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import ButtonBase from '../ButtonBase';

configure({ adapter: new Adapter() });

describe('ButtonBase', () => {
  it('should render', () => {
    const component = <ButtonBase>Button</ButtonBase>;
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });
});
