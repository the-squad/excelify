import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from './ButtonBase';
import Text from '../text/Text';
import Spinner from '../spinner/Spinner';
import { COLORS } from '../../base/Colors';

class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.string,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    color: COLORS.BLUE,
    primary: true,
    disabled: false,
    isLoading: false,
  };

  state = {
    text: this.props.children,
  };

  /**
   * Decides button background and text color depends on the button type
   * and whether it's disabled or not
   * Types:
   * - Primary: Background will inherit color prop and the text will be white
   * - Secondary: Text will inherit color prop and the background will be transparent
   *
   * @returns {object} contains {textColor, buttonBackground}
   */
  getButtonColors = () => {
    const { color, primary, disabled, isLoading } = this.props;
    let textColor;
    let buttonBackground;

    if (primary) {
      textColor = disabled || isLoading ? COLORS.TEXT : COLORS.WHITE;
      buttonBackground = disabled || isLoading ? COLORS.DISABLED : color;
    } else {
      textColor = disabled || isLoading ? COLORS.TEXT : color;
      buttonBackground = COLORS.TRANSPARENT;
    }

    return {
      textColor,
      buttonBackground,
    };
  };

  render() {
    const { text } = this.state;
    const { isLoading, disabled } = this.props;
    const { textColor, buttonBackground } = this.getButtonColors();

    return (
      <ButtonBase {...this.props} disabled={disabled || isLoading} bg={buttonBackground}>
        {isLoading && <Spinner radius={16} color={textColor} mr={2} />}
        <Text tag="span" zIndex="1" width="max-content" color={textColor}>
          {text}
        </Text>
      </ButtonBase>
    );
  }
}

export default Button;
