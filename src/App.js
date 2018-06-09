import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import theme from './base/Theme';
import Upload from './views/Upload';

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

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
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

export default hot(module)(App);
