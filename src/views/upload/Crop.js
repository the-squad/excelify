// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import { Flex } from 'grid-styled';
import 'react-image-crop/dist/ReactCrop.css';

import Button from '../../components/buttons/Button';

import { COLORS } from '../../base/Colors';

import { saveCroppedImage } from '../../store/actions/image';

type Props = {
  image: string,
  croppedImagePoints: {
    x: number,
    y: number,
    height: number,
    width: number,
  },
  saveCroppedImage: Function,
  nextStep: Function,
  previousStep: Function,
};

type State = {
  crop: {
    x: number,
    y: number,
    height: number,
    width: number,
  },
};

const StyledImage = styled(ReactCrop)`
  width: 100%;
`;

class Crop extends Component<Props, State> {
  state = {
    crop: this.props.croppedImagePoints,
  };

  onChange = (crop: Object) => {
    this.setState({ crop });
  };

  onCrop = async (crop: Object, pixelCrop: Object) => {
    const image = await this.getCroppedImg(this.props.image, pixelCrop);
    const imageReader = new FileReader();
    let base64Image;

    // Return if there isn't image object
    if (!image) return;
    imageReader.readAsDataURL(image);
    imageReader.onloadend = () => {
      base64Image = imageReader.result;
      this.props.saveCroppedImage(base64Image, pixelCrop);
    };
  };

  getCroppedImg = (image: string, pixelCrop: Object) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const imageObject = new Image();
    imageObject.src = image;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageObject,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    // As a blob
    return new Promise(resolve => {
      canvas.toBlob(file => {
        resolve(file);
      }, 'image/jpeg');
    });
  };

  render() {
    const { crop } = this.state;
    return (
      <Flex alignItems="center" justifyContent="center" width={1} flexDirection="column">
        <StyledImage
          src={this.props.image}
          crop={crop}
          onChange={this.onChange}
          onComplete={this.onCrop}
        />

        <Flex justifyContent="flex-end" width={1} mt={3}>
          <Button onClick={this.props.previousStep} primary={false} ml={2} color={COLORS.TEXT}>
            Back
          </Button>
          <Button onClick={this.props.nextStep}>Crop and Continue</Button>
        </Flex>
      </Flex>
    );
  }
}

const mapStateToProps = store => ({
  image: store.image.image,
  points: store.image.croppedImagePoints,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveCroppedImage,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Crop);
