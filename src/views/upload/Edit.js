// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const Image = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 4px;
  object-fit: cover;
`;

type Props = {
  image: string,
  originalImage: string,
};

type State = {
  image: string,
};

class Edit extends Component<Props, State> {
  state = {
    image: this.props.image || this.props.originalImage,
  };

  onBrightnessChange = (value: number) => {
    this.brightness = value;
    // TODO: logic here
    // TODO: Un-comment these lines
    // this.setState({
    //   image: result,
    // });
  };

  onContrastChange = (value: number) => {
    this.contrast = value;
    // TODO: logic here
    // TODO: Un-comment these lines
    // this.setState({
    //   image: result,
    // });
  };

  contrast: number = 0;
  brightness: number = 0;

  render() {
    return (
      <Flex>
        <Box width={1}>
          <Slider onChange={this.onBrightnessChange} />
          <Slider onChange={this.onContrastChange} />
        </Box>
        <Image src={this.state.image} />
      </Flex>
    );
  }
}

const mapStateToProps = store => ({
  image: store.image.croppedImage,
  originalImage: store.image.image,
});

export default connect(mapStateToProps)(Edit);
