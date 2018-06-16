// @flow
import React from 'react';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Upload from './Upload';
import Crop from './Crop';
import Edit from './Edit';

import Modal from '../../components/modal/Modal';
import Progress from '../../components/progress/Progress';
import Text from '../../components/text/Text';
import ImageField from '../../components/imageField/ImageField';

import { FONT_TYPES } from '../../base/Typography';
import { COLORS, COLORS_VALUES } from '../../base/Colors';

import { closeUploadModal } from '../../store/actions/modals';

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
    desc: 'Choose an image with these formats .png, .jpeg and .jpg',
  },
  {
    title: 'Crop Image',
    desc: 'Crop the image to select table boundaries for better recognition',
  },
  {
    title: 'Edit Image',
    desc: 'Change image brightness and contrast to highlight table lines',
  },
];

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS_VALUES[COLORS.SEPARATOR]};
`;

type Props = {
  uploadModal: boolean,
  closeUploadModal: Function,
};

type State = {
  currentStep: number,
};

class UploadContainer extends React.Component<Props, State> {
  state = {
    currentStep: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.uploadModal !== this.props.uploadModal && this.modal) {
      if (this.props.uploadModal) {
        this.modal.openModal();
      } else {
        this.modal.closeModal();
      }
    }
  }

  getImageFieldRef = () => this.imageField;
  imageField: ?Object;
  modal: ?Object;

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

  resetStep = () => {
    this.setState({
      currentStep: 0,
    });
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
        <Modal
          ref={modal => {
            this.modal = modal;
          }}
          onClose={this.props.closeUploadModal}
        >
          <Box p={3}>
            <Text type={FONT_TYPES.SUBHEADING}>Upload an image you want to convert</Text>
          </Box>
          <Separator />
          <Box p={3}>
            <Progress steps={steps} currentStep={currentStep} />
            <Box mb={3} />
            <React.Fragment>
              {routes.map(
                (route: Object, index: number) =>
                  index === currentStep && (
                    <route.component
                      key={route.path}
                      getImageFieldRef={this.getImageFieldRef}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      resetStep={this.resetStep}
                    />
                  ),
              )}
            </React.Fragment>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  uploadModal: store.modals.uploadModal,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeUploadModal,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadContainer);
