import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import store from './store';

import theme from './base/Theme';
import Upload from './views/upload';

import Header from './components/header/Header';
import SetGlobalFont from './components/text/SetGlobalFont';
import IconsStore from './components/icon/IconsStore';

import Icons from './assets/selection.json';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    margin: 0;
  }
`;
/* eslint-enable no-unused-expressions */

const routes = [
  {
    path: '/upload',
    component: Upload,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    SetGlobalFont();
    IconsStore.setIcons(Icons);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <React.Fragment>
            <Header />
            {routes.map(route => (
              <Route
                key={route.path}
                exact={route.path === '/'}
                path={route.path}
                component={route.component}
              />
            ))}
          </React.Fragment>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
