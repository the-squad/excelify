import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { hot } from 'react-hot-loader';

import theme from './base/Theme';
import Upload from './views/Upload';

import Header from './components/header/Header';
import SetGlobalFont from './components/text/SetGlobalFont';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    margin: 0;
  }
`;
/* eslint-enable no-unused-expressions */

const routes = [
  {
    path: '/',
    component: () => <div>Home</div>,
  },
  {
    path: '/upload',
    component: Upload,
  },
  {
    path: '/edit',
    component: () => <div>edit</div>,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    SetGlobalFont();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
