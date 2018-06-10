import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import { COLORS } from '../../../base/Colors';
import Spinner from '../Spinner';

configure({ adapter: new Adapter() });

describe('Spinner', () => {
  it('should render', () => {
    const component = <Spinner />;
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render radius correctly', () => {
    const component = <Spinner radius={60} />;
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render color correctly', () => {
    const component = <Spinner color={COLORS.PRIMARY_BLUE} />;
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });
});
