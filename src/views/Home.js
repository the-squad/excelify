import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';

import Text from '../components/text/Text';
import InputField from '../components/inputField/InputField';
import Button from '../components/buttons/Button';

import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import { COLORS, COLORS_VALUES } from '../base/Colors';

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

class Home extends Component {
  state = {
    form: SIGNUP_FORM,
  };

  changeForm = (form: string) => {
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
      <InputField isRequired width="inherit" placeholder="Email" />
      <InputField isRequired width="inherit" placeholder="Password" type="password" />
      <Flex justifyContent="space-between">
        <RedirectButton onClick={() => this.changeForm(SIGNUP_FORM)} primary={false}>
          Don't have an account? {/* eslint-disable-line */}
        </RedirectButton>
        <Button>Login</Button>
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
      <InputField isRequired width="inherit" placeholder="Name" />
      <InputField isRequired width="inherit" placeholder="Email" />
      <InputField isRequired width="inherit" placeholder="Password" type="password" />
      <Flex justifyContent="space-between">
        <RedirectButton onClick={() => this.changeForm(LOGIN_FORM)} primary={false}>
          Already have an account?
        </RedirectButton>
        <Button>Signup</Button>
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

export default Home;
