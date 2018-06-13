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

  onSlide = () => {
    // const image = new Image();
    // image.src = this.props.image;
    // const result = ImageBrightness({ data: image, adjustment: value, asDataURL: true });
    // this.setState({
    //   image: result,
    // });
  };

  render() {
    return (
      <Flex>
        <Box width={1}>
          <Slider onChange={this.onSlide} />
        </Box>
        <Image
          src={this.state.image}
          id="photo"
          ref={test => {
            this.test = test;
          }}
        />
      </Flex>
    );
  }
}

const mapStateToProps = store => ({
  image: store.image.croppedImage,
  originalImage: store.image.image,
});

export default connect(mapStateToProps)(Edit);
