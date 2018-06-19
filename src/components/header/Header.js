import React from 'react';
import { Flex } from 'grid-styled';
import { space } from 'styled-system';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';

import Text from '../text/Text';
import Button from '../buttons/Button';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';

import { COLORS_VALUES, COLORS } from '../../base/Colors';
import Space from '../../base/Space';
import { FONT_TYPES } from '../../base/Typography';

import { logOut, loadUser } from '../../store/actions/user';
import { openUploadModal } from '../../store/actions/modals';

type Props = {
  history: object,
  name: string,
  email: string,
  history: Object,
  logOut: Function,
  loadUser: Function,
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

const Divider = styled.div`
  height: 38px;
  width: 1px;
  background-color: ${COLORS_VALUES[COLORS.DISABLED_LIGHT]};
  ${space};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: ${COLORS_VALUES[COLORS.TRANSPARENT]};
  width: max-content;
  height: 39px;
  border: none;
  cursor: pointer;
  padding: 0 ${Space[4]}px;
  border-radius: 4px;

  &:hover {
    background: ${COLORS_VALUES[COLORS.PAGE_BACKGROUND]};
  }

  label {
    cursor: pointer;
  }
`;

class Header extends React.Component<Props> {
  componentDidMount() {
    const token = Cookies.get('GP_TOKEN');
    const name = Cookies.get('GP_NAME');
    if (token && name) {
      this.props.loadUser(name, token);
    }
  }

  render() {
    const { name, history } = this.props;

    return (
      <HeaderContainer alignItems="center" justifyContent="space-between" {...this.props}>
        <Logo tag="h1" key="logo" type={FONT_TYPES.TITLE} m="0">
          Excelify
        </Logo>
        <Flex>
          <Button onClick={this.props.openUploadModal}>Convert Image</Button>
          {name && (
            <Flex justifyContent="center" height={1}>
              <Divider ml={3} />
              <LogoutButton
                onClick={() => {
                  this.props.logOut();
                  history.push('/');
                }}
              >
                <Text mr={2}>Logout</Text>
                <Icon icon={IconsStore.getIcon('log-out')} width={17} />
              </LogoutButton>
            </Flex>
          )}
        </Flex>
      </HeaderContainer>
    );
  }
}

const mapStateToProps = store => ({
  name: store.user.name,
  email: store.user.email,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openUploadModal,
      logOut,
      loadUser,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
