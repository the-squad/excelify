import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import Text from '../Text';
import theme from '../../../base/Theme';
import { FONT_WEIGHTS, FONT_TYPES, LINE_HEIGHTS } from '../../../base/Typography';
import { COLORS } from '../../../base/Colors';

configure({ adapter: new Adapter() });

describe('Typography', () => {
  it('should render', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text>Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render type correctly', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text type={FONT_TYPES.heading}>Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render font weight correctly', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text fontWeight={FONT_WEIGHTS.semiBold}>Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render color correctly', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text color={COLORS.TEXT}>Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render line height correctly', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text lineHeight={LINE_HEIGHTS[FONT_TYPES.BODY]}>Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = render(component);
    expect(tree).toMatchSnapshot();
  });

  it('should render tag correctly', () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Text tag="h1">Some sort of text</Text>
      </ThemeProvider>
    );
    const tree = shallow(component)
      .dive()
      .dive()
      .dive();
    expect(tree.type().toString()).toEqual('h1');
  });
});
