import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../text/Text';
import Button from '../buttons/Button';

import { COLORS_VALUES, COLORS } from '../../base/Colors';
import Space from '../../base/Space';
import { FONT_TYPES } from '../../base/Typography';

import { openUploadModal } from '../../store/actions/modals';

type Props = {
  history: object,
  openUploadModal: Function,
};

const HeaderContainer = Flex.extend`
  border-bottom: 1px solid ${COLORS_VALUES[COLORS.BORDER]};
  padding: ${Space[2]}px ${Space[4]}px;
`;

const Logo = styled(Text)`
  font-family: 'Roboto Slab';
  font-weight: 600;
  color: ${COLORS_VALUES[COLORS.BLUE]};
`;

const Header = (props: Props) => (
  <HeaderContainer alignItems="center" justifyContent="space-between" {...props}>
    <Logo tag="h1" key="logo" type={FONT_TYPES.TITLE} m="0">
      Cerberus
    </Logo>
    <Button onClick={props.openUploadModal}>Convert Image</Button>
  </HeaderContainer>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openUploadModal,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Header));
