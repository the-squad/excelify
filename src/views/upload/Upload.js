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
  border: 3px dashed ${COLORS_VALUES[COLORS.DISABLED]};
  border-radius: 4px;
`;

type Props = {
  getImageFieldRef: Function,
  saveImage: Function,
  nextStep: Function,
};

class Upload extends Component<Props> {
  onUploadImage = image => {
    this.props.saveImage(image);
    this.props.nextStep();
  };

  render() {
    const { getImageFieldRef } = this.props;
    this.props.getImageFieldRef().setProps(this.onUploadImage);

    return (
      <UploadContainer width={1} height={500} alignItems="center" justifyContent="center">
        <Flex flexDirection="column" mr={5}>
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
          <Box mb={3} />
          <Button
            onClick={() => {
              getImageFieldRef().click();
            }}
          >
            Upload Image
          </Button>
        </Flex>
        <Flex>
          <Icon icon={IconsStore.getIcon('drag')} width={125} color={COLORS.DISABLED} />
        </Flex>
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
