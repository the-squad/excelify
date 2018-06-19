// @flow

import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { login, signUp } from '../store/actions/user';

import Text from '../components/text/Text';
import InputField from '../components/inputField/InputField';
import Button from '../components/buttons/Button';
import IconsStore from '../components/icon/IconsStore';

import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import { COLORS, COLORS_VALUES } from '../base/Colors';

import validateFields from '../utils/ValidateFields';
import Regex from '../utils/ValidationRegex';

import Background from '../assets/home-bg.png';

const RedirectButton = styled(Button)`
  padding: 0;
`;

const HomeContainer = styled(Flex)`
  background-position: center;
  background-size: cover;
  background-image: url(${Background});
  width: 100%;
  height: 92vh;
`;

const Card = styled(Flex)`
  background: ${COLORS_VALUES[COLORS.WHITE]};
  border-radius: 4px;
  width: 400px;
  height: max-content;
  border: 1px solid ${COLORS_VALUES[COLORS.BORDER]};
  box-shadow: 0px 3px 7px -1px ${hexToRgba(COLORS_VALUES[COLORS.HELP_TEXT], 0.67)};
`;

const SIGNUP_FORM = 0;
const LOGIN_FORM = 1;
const NAME = 'NAME';
const EMAIL = 'EMAIL';
const PASSWORD = 'PASSWORD';
const ICON_WIDTH = 16;

type Props = {
  isLoggingIn: boolean,
  isLoggedIn: boolean,
  isError: boolean,
  history: Object,
  login: Function,
  signUp: Function,
};

type State = {
  form: number,
  [typeof NAME | typeof EMAIL | typeof PASSWORD]: ?string,
};

class Home extends Component<Props, State> {
  state = {
    form: SIGNUP_FORM,
    [NAME]: undefined,
    [EMAIL]: undefined,
    [PASSWORD]: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.history.push('sheets');
    }

    if (prevProps.isError !== this.props.isError && this.props.isError === true) {
      if (this.state.form === SIGNUP_FORM) {
        if (this.emailField) {
          this.emailField.showErrorMessage('Email already exists');
        }
      } else if (this.emailField) {
        this.emailField.showErrorMessage('Wrong credentials');
      }
    }
  }

  onLogin = () => {
    const fields = [this.emailField, this.passwordField];
    const isValid = validateFields(fields);

    if (isValid) {
      this.props.login(this.state[EMAIL], this.state[PASSWORD]);
    }
  };

  onSignUp = () => {
    const fields = [this.nameField, this.emailField, this.passwordField];
    const isValid = validateFields(fields);

    if (isValid) {
      this.props.signUp(this.state[NAME], this.state[EMAIL], this.state[PASSWORD]);
    }
  };

  nameField: {
    hideErrorMessage: Function,
  };
  emailField: {
    showErrorMessage: Function,
    hideErrorMessage: Function,
  };
  passwordField: {
    hideErrorMessage: Function,
  };

  updateFieldValue = (value: string, type: string) => {
    this.setState({
      [type]: value,
    });
  };

  changeForm = (form: number) => {
    this.emailField.hideErrorMessage();
    this.nameField.hideErrorMessage();
    this.passwordField.hideErrorMessage();

    this.setState({
      form,
    });
  };

  renderLoginForm = () => (
    <React.Fragment>
      <Text type={FONT_TYPES.TITLE} mb={1}>
        Login to your account
      </Text>
      <Text
        color={COLORS.HELP_TEXT}
        type={FONT_TYPES.SUBHEADING}
        fontWeight={FONT_WEIGHTS.SUPER_LIGHT}
        mb={3}
      >
        When you login you will able to view your history
      </Text>
      <InputField
        ref={input => {
          if (input) {
            this.emailField = input;
          }
        }}
        onChange={this.updateFieldValue}
        callbackParams={EMAIL}
        isRequired
        width="inherit"
        placeholder="Email"
        disable={false}
        value={this.state[EMAIL]}
        icon={IconsStore.getIcon('email')}
        iconWidth={ICON_WIDTH}
        regexArray={Regex.email}
      />
      <InputField
        ref={input => {
          if (input) {
            this.passwordField = input;
          }
        }}
        onChange={this.updateFieldValue}
        callbackParams={PASSWORD}
        isRequired
        width="inherit"
        placeholder="Password"
        type="password"
        disable={false}
        value={this.state[PASSWORD]}
        icon={IconsStore.getIcon('password')}
        iconWidth={ICON_WIDTH}
        regexArray={Regex.password}
      />
      <Flex justifyContent="space-between">
        <RedirectButton
          disabled={this.props.isLoggingIn}
          onClick={() => this.changeForm(SIGNUP_FORM)}
          primary={false}
        >
          Don't have an account? {/* eslint-disable-line */}
        </RedirectButton>
        <Button onClick={this.onLogin} isLoading={this.props.isLoggingIn}>
          Login
        </Button>
      </Flex>
    </React.Fragment>
  );

  renderSignUpForm = () => (
    <React.Fragment>
      <Text type={FONT_TYPES.TITLE} mb={1}>
        Create an account
      </Text>
      <Text
        color={COLORS.HELP_TEXT}
        type={FONT_TYPES.SUBHEADING}
        fontWeight={FONT_WEIGHTS.SUPER_LIGHT}
        mb={3}
      >
        When you create an account you will be able access your history later
      </Text>
      <InputField
        ref={input => {
          if (input) {
            this.nameField = input;
          }
        }}
        onChange={this.updateFieldValue}
        callbackParams={NAME}
        isRequired
        icon={IconsStore.getIcon('user')}
        disable={false}
        iconWidth={ICON_WIDTH}
        width="inherit"
        placeholder="Name"
        value={this.state[NAME]}
        regexArray={Regex.name}
      />
      <InputField
        ref={input => {
          if (input) {
            this.emailField = input;
          }
        }}
        onChange={this.updateFieldValue}
        callbackParams={EMAIL}
        isRequired
        width="inherit"
        placeholder="Email"
        value={this.state[EMAIL]}
        disable={false}
        icon={IconsStore.getIcon('email')}
        iconWidth={ICON_WIDTH}
        regexArray={Regex.email}
      />
      <InputField
        ref={input => {
          if (input) {
            this.passwordField = input;
          }
        }}
        onChange={this.updateFieldValue}
        callbackParams={PASSWORD}
        isRequired
        width="inherit"
        placeholder="Password"
        type="password"
        disable={false}
        value={this.state[PASSWORD]}
        icon={IconsStore.getIcon('password')}
        iconWidth={ICON_WIDTH}
        regexArray={Regex.password}
      />
      <Flex justifyContent="space-between">
        <RedirectButton
          disabled={this.props.isLoggingIn}
          onClick={() => this.changeForm(LOGIN_FORM)}
          primary={false}
        >
          Already have an account?
        </RedirectButton>
        <Button onClick={this.onSignUp} isLoading={this.props.isLoggingIn}>
          Signup
        </Button>
      </Flex>
    </React.Fragment>
  );

  render() {
    const { form } = this.state;

    return (
      <HomeContainer alignItems="center" justifyContent="center">
        <Flex flexDirection="column" mr={6}>
          <Text
            lineHeight={1}
            type={FONT_TYPES.HERO_TITLE}
            fontWeight={FONT_WEIGHTS.SEMI_BOLD}
            mb={3}
          >
            Welcome to a home <br /> of sheets
          </Text>
          <Text
            color={COLORS.HELP_TEXT}
            type={FONT_TYPES.SUPER_TITLE}
            fontWeight={FONT_WEIGHTS.SUPER_LIGHT}
          >
            Upload a scanned sheet and we will <br /> convert to an editable Excel sheet
          </Text>
        </Flex>
        <Card flexDirection="column" p={4}>
          {form === SIGNUP_FORM ? this.renderSignUpForm() : this.renderLoginForm()}
        </Card>
      </HomeContainer>
    );
  }
}

const mapStateToProps = store => ({
  isLoggedIn: store.user.isLoggedIn,
  isLoggingIn: store.user.isLoggingIn,
  isError: store.user.isError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      signUp,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Home));
