// @flow
import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../components/text/Text';
import Button from '../../components/buttons/Button';
import Icon from '../../components/icon/Icon';
import IconsStore from '../../components/icon/IconsStore';

import { FONT_TYPES, FONT_WEIGHTS } from '../../base/Typography';
import { COLORS, COLORS_VALUES } from '../../base/Colors';

import { saveImage } from '../../store/actions/image';

const UploadContainer = Flex.extend`
  height: 370px;
  border: 4px dashed ${COLORS_VALUES[COLORS.DISABLED]};
  border-radius: 4px;
`;

type Props = {
  saveImage: Function,
};

class Upload extends Component<Props> {
  fileInput: ?Object;

  upload = () => {
    const file = this.fileInput && this.fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.props.saveImage(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <UploadContainer width={1} height={500} alignItems="center" justifyContent="center">
        <Flex flexDirection="column" mr={6}>
          <Text
            color={COLORS.DISABLED}
            type={FONT_TYPES.SUPER_TITLE}
            fontWeight={FONT_WEIGHTS.SEMI_BOLD}
          >
            Drag and drop a photo
          </Text>
          <Box mb={2} />
          <Text color={COLORS.DISABLED} type={FONT_TYPES.HEADING}>
            or upload using the button below
          </Text>
          <Box mb={4} />
          <input
            type="file"
            onChange={this.upload}
            ref={(input: ?Object) => {
              if (input) {
                this.fileInput = input;
              }
            }}
            style={{ display: 'none' }}
          />
          <Button
            onClick={() => {
              if (this.fileInput) {
                this.fileInput.click();
              }
            }}
          >
            Upload Image
          </Button>
        </Flex>
        <Icon icon={IconsStore.getIcon('drag')} width={175} color={COLORS.DISABLED} />
      </UploadContainer>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveImage,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(Upload);
