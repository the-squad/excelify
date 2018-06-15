import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../../store';
import Header from '../Header';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render', () => {
    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
