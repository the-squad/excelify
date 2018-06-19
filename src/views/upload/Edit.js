// @flow

import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import { convertImage } from '../../store/actions/image';
import { closeUploadModal } from '../../store/actions/modals';

import { COLORS, COLORS_VALUES } from '../../base/Colors';

import Button from '../../components/buttons/Button';
import Text from '../../components/text/Text';

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
`;

/* eslint-disable no-unused-expressions */
injectGlobal`
  .input-range__slider {
    background: ${COLORS_VALUES[COLORS.BLUE]} !important;
    border-color: ${COLORS_VALUES[COLORS.BLUE]} !important;
  }

  .input-range__track--active {
    background: ${COLORS_VALUES[COLORS.BLUE]} !important;
  }

  .input-range__track,
  ..input-range__slider {
    transition: left 750ms ease-out, width 750ms ease-out !important;
  }
`;
/* eslint-enable no-unused-expressions */

type Props = {
  image: string,
  imageName: string,
  originalImage: string,
  isConverting: boolean,
  history: Object,
  previousStep: Function,
  closeUploadModal: Function,
  convertImage: Function,
  resetStep: Function,
};

type State = {
  image: string,
  contrast: number,
  brightness: number,
};

class Edit extends Component<Props, State> {
  state = {
    image: this.props.image || this.props.originalImage,
    contrast: 0,
    brightness: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isConverting !== this.props.isConverting && !this.props.isConverting) {
      this.props.closeUploadModal();
      this.props.resetStep();
      if (!window.location.pathname.includes('/sheets')) {
        this.props.history.push('/sheets');
      }
    }
  }

  onSubmit = () => {
    this.props.convertImage(this.state.image, this.props.imageName);
  };

  onBrightnessChange = (value: number) => {
    this.setState(
      {
        brightness: value,
      },
      () => this.applyFilters(),
    );
  };

  onContrastChange = (value: number) => {
    this.setState(
      {
        contrast: value,
      },
      () => this.applyFilters(),
    );
  };

  applyBrightness = (imgData, adjust) => {
    const adjustCopy = Math.floor(255 * (adjust / 100));
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] += adjustCopy;
      d[i + 1] += adjustCopy;
      d[i + 2] += adjustCopy;
    }
    return imgData;
  };

  applyContrast = (imgData, adjust) => {
    const adjustCopy = ((adjust + 100) / 100) ** 2;
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = ((d[i] / 255 - 0.5) * adjustCopy + 0.5) * 255;
      d[i + 1] = ((d[i + 1] / 255 - 0.5) * adjustCopy + 0.5) * 255;
      d[i + 2] = ((d[i + 2] / 255 - 0.5) * adjustCopy + 0.5) * 255;
    }
    return imgData;
  };

  loadImage = url =>
    new Promise(resolve => {
      const img = document.createElement('img');
      img.onload = () => resolve(img);
      img.src = url;
    });

  applyFilters = async () => {
    const { brightness, contrast } = this.state;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const image: HTMLImageElement = await this.loadImage(
      this.props.image || this.props.originalImage,
    );
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    let newImageData: ImageData = ctx.getImageData(0, 0, image.width, image.height);
    newImageData = this.applyBrightness(newImageData, brightness);
    newImageData = this.applyContrast(newImageData, contrast);
    ctx.putImageData(newImageData, 0, 0);

    this.setState({
      image: canvas.toDataURL(),
    });
  };

  contrast: number = 0;
  brightness: number = 0;

  render() {
    const { image, contrast, brightness } = this.state;
    const { isConverting } = this.props;

    return (
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <Box width={1} mb={2}>
            <Text mb={1}>Brightness</Text>
            <Box p={2}>
              <InputRange
                maxValue={50}
                minValue={-50}
                value={brightness}
                formatLabel={() => ''}
                onChange={this.onBrightnessChange}
                slider="input--slider"
              />
            </Box>
            <Text mt={2} mb={3}>
              Contrast
            </Text>
            <Box p={2}>
              <InputRange
                maxValue={50}
                minValue={-50}
                value={contrast}
                formatLabel={() => ''}
                onChange={this.onContrastChange}
                slider="input--slider"
              />
            </Box>
          </Box>
          <Image src={image} />
        </Flex>
        <Flex justifyContent="flex-end" width={1} mt={3}>
          <Button
            disabled={isConverting}
            onClick={this.props.previousStep}
            primary={false}
            ml={2}
            color={COLORS.TEXT}
          >
            Back
          </Button>
          <Button isLoading={isConverting} onClick={this.onSubmit}>
            Upload and Convert
          </Button>
        </Flex>
      </Flex>
    );
  }
}

const mapStateToProps = store => ({
  image: store.image.croppedImage,
  imageName: store.image.imageName,
  originalImage: store.image.image,
  isConverting: store.image.isConverting,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeUploadModal,
      convertImage,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Edit));
