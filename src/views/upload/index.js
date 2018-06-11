// @flow
import React from 'react';
import styled from 'styled-components';
import { Route, BrowserRouter } from 'react-router-dom';
import { Box } from 'grid-styled';

import Upload from './Upload';
import Crop from './Crop';
import Edit from './Edit';

import Modal from '../../components/modal/Modal';
import Progress from '../../components/progress/Progress';
import Text from '../../components/text/Text';
import ImageField from '../../components/imageField/ImageField';

import { FONT_TYPES } from '../../base/Typography';
import { COLORS, COLORS_VALUES } from '../../base/Colors';

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

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS_VALUES[COLORS.SEPARATOR]};
`;

type State = {
  currentStep: number,
};

class UploadContainer extends React.Component<null, State> {
  state = {
    currentStep: 0,
  };

  getImageFieldRef = () => this.imageField;
  imageField: ?Object;

  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
    }));
  };

  previousStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1,
    }));
  };

  render() {
    const { currentStep } = this.state;

    return (
      <React.Fragment>
        <ImageField
          ref={imageField => {
            this.imageField = imageField;
          }}
        />
        <Modal>
          <Box p={3}>
            <Text type={FONT_TYPES.SUBHEADING}>Upload an image you want to convert</Text>
          </Box>
          <Separator />
          <Box p={3}>
            <Progress steps={steps} currentStep={currentStep} />
            <Box mb={4} />
            <BrowserRouter basename="upload">
              <React.Fragment>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    exact={route.path === '/'}
                    path={route.path}
                    component={() => (
                      <route.component
                        getImageFieldRef={this.getImageFieldRef}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                      />
                    )}
                  />
                ))}
              </React.Fragment>
            </BrowserRouter>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UploadContainer;
