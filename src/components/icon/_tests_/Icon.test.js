import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import IconsStore from '../IconsStore';
import Icon from '../Icon';
import icons from './icons.json';
import { COLORS } from '../../../base/Colors';

configure({ adapter: new Adapter() });

describe('Icon', () => {
  IconsStore.setIcons(icons);

  it('should render icon correctly', () => {
    const icon = <Icon icon={IconsStore.getIcon('clinic')} width={15} />;
    const tree = render(icon);
    expect(tree).toMatchSnapshot();
  });

  it('should render icon color correctly', () => {
    const icon = (
      <Icon icon={IconsStore.getIcon('clinic')} width={15} color={COLORS.PRIMARY_BLUE} />
    );
    const tree = render(icon);
    expect(tree).toMatchSnapshot();
  });
});
