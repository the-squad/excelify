import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Box } from 'grid-styled';

import ViewContainer from '../ViewContainer';
import Upload from './Upload';
import Crop from './Crop';
import Edit from './Edit';

import Progress from '../../components/progress/Progress';
import Text from '../../components/text/Text';

import { FONT_TYPES, FONT_WEIGHTS } from '../../base/Typography';

const routes = [
  {
    path: '/',
    component: Upload,
  },
  {
    path: '/crop',
    component: Crop,
  },
  {
    path: '/edit',
    component: Edit,
  },
];

const steps = [
  {
    title: 'Upload Image',
    desc: 'Upload Image desc',
  },
  {
    title: 'Crop Image',
    desc: 'Crop Image desc',
  },
  {
    title: 'Edit Image',
    desc: 'Edit Image desc',
  },
];

const UploadContainer = () => (
  <ViewContainer>
    <Box mb={3} />
    <Text type={FONT_TYPES.TITLE} fontWeight={FONT_WEIGHTS.SEMI_BOLD}>
      Upload an image you want to convert
    </Text>
    <Box mb={2} />
    <Text>Go through this step to make sure to upload the most optimized image</Text>
    <Box mb={4} />
    <Progress
      steps={steps}
      currentStep={routes.findIndex(
        route =>
          route.path ===
          `/${window.location.pathname
            .split('/')
            .slice(-1)
            .pop()}`,
      )}
    />
    <Box mb={4} />
    <BrowserRouter basename="upload">
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
    </BrowserRouter>
  </ViewContainer>
);

export default UploadContainer;
