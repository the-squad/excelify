import React from 'react';
import { configure, render, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import Button from '../Button';
import theme from '../../../base/Theme';
import { COLORS } from '../../../base/Colors';

configure({ adapter: new Adapter() });

describe('Button', () => {
  it('should render', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button>Button</Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(<Button>Button</Button>);
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.WHITE,
      buttonBackground: COLORS.BLUE,
    });
  });

  it('should render color correctly with primary type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button color={COLORS.BLUE}>Button</Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(<Button color={COLORS.PRIMARY_BLUE}>Button</Button>);
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.WHITE,
      buttonBackground: COLORS.BLUE,
    });
  });

  it('should render color correctly with outline type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button primary={false} color={COLORS.BLUE}>
          Button
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <Button primary={false} color={COLORS.BLUE}>
        Button
      </Button>,
    );
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.BLUE,
      buttonBackground: COLORS.TRANSPARENT,
    });
  });

  it('should render disabled color correctly with primary type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button disabled color={COLORS.BLUE}>
          Button
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <Button disabled color={COLORS.BLUE}>
        Button
      </Button>,
    );
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.TEXT,
      buttonBackground: COLORS.DISABLED_LIGHT,
    });
  });

  it('should render disabled color correctly with outline type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button disabled primary={false} color={COLORS.PRIMARY_BLUE}>
          Button
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <Button disabled primary={false} color={COLORS.PRIMARY_BLUE}>
        Button
      </Button>,
    );
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.TEXT,
      buttonBackground: COLORS.TRANSPARENT,
    });
  });

  it('should render spinner when isLoading = true with primary type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button isLoading primary color={COLORS.PRIMARY_BLUE}>
          Button
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <Button isLoading primary color={COLORS.PRIMARY_BLUE}>
        Button
      </Button>,
    );
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.TEXT,
      buttonBackground: COLORS.DISABLED_LIGHT,
    });
  });

  it('should render spinner when isLoading = true with outline type', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <Button isLoading primary={false} color={COLORS.PRIMARY_BLUE}>
          Button
        </Button>
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <Button isLoading primary={false} color={COLORS.PRIMARY_BLUE}>
        Button
      </Button>,
    );
    expect(wrapper.instance().getButtonColors()).toEqual({
      textColor: COLORS.TEXT,
      buttonBackground: COLORS.TRANSPARENT,
    });
  });

  it('should not trigger onClick when disabled', () => {
    let counter = 0;
    const count = () => {
      counter += 1;
    };

    const wrapper = mount(
      <Button disabled onClick={count}>
        Button
      </Button>,
    );
    wrapper.simulate('click');
    expect(counter).toEqual(0);
  });
});
