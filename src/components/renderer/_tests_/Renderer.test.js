import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import { renderer, STATES } from '../Renderer';

configure({ adapter: new Adapter() });

describe('Renderer', () => {
  it('should render initial state', () => {
    const list = renderer.init();
    const component = list.fold({
      [STATES.NOT_LOADED]: () => <h1>Init</h1>,
    });
    const tree = mount(component);
    expect(tree.containsMatchingElement(<h1>Init</h1>)).toEqual(true);
  });

  it('should render loading state', () => {
    const list = renderer.loading();
    const component = list.fold({
      [STATES.LOADING]: () => <h1>Loading</h1>,
    });
    const tree = mount(component);
    expect(tree.containsMatchingElement(<h1>Loading</h1>)).toEqual(true);
  });

  it('should render success state', () => {
    const list = renderer.success();
    const component = list.fold({
      [STATES.SUCCESS]: () => <h1>Success</h1>,
    });
    const tree = mount(component);
    expect(tree.containsMatchingElement(<h1>Success</h1>)).toEqual(true);
  });

  it('should render failure state', () => {
    const list = renderer.failure();
    const component = list.fold({
      [STATES.FAILURE]: () => <h1>Failure</h1>,
    });
    const tree = mount(component);
    expect(tree.containsMatchingElement(<h1>Failure</h1>)).toEqual(true);
  });

  it('should render empty state', () => {
    const list = renderer.empty();
    const component = list.fold({
      [STATES.EMPTY]: () => <h1>Empty</h1>,
    });
    const tree = mount(component);
    expect(tree.containsMatchingElement(<h1>Empty</h1>)).toEqual(true);
  });
});
