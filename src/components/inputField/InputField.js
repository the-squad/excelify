// @flow

import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import { fontSize, borderColor } from 'styled-system';

import Text from '../text/Text';
import Icon from '../icon/Icon';

import { FONT_TYPES, FONT_WEIGHTS, FONT_SIZES } from '../../base/Typography';
import { COLORS_VALUES, COLORS } from '../../base/Colors';
import Space from '../../base/Space';

const InputFieldContainer = styled.div`
  border: 1px solid;
  ${borderColor};
  height: 38px;
  width: ${props => (props.width ? props.width : 'max-content')};
  display: flex;
  align-items: center;
  padding: 0 ${Space[3]}px;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  ${fontSize};
  font-weight: ${FONT_WEIGHTS.normal};
  color: ${COLORS_VALUES[COLORS.TEXT]};
  width: 100%;
`;

const ErrorMessage = styled(Text)`
  height: 24px;
  display: flex;
  align-items: center;
  width: ${props => props.width};
`;

type Props = {
  type: string,
  width: number | string,
  icon: Object,
  iconWidth: number,
  placeholder: string,
  value: ?string,
  onChange: Function,
  onBlur: Function,
  onFocus: Function,
  isRequired: boolean,
  disable: boolean,
  callbackParams: any,
  regexArray: Object,
  hideErrorMessage: boolean,
};

type State = {
  color: string,
  errorMessage: ?string,
};

class InputField extends React.Component<Props, State> {
  static defaultProps = {
    type: 'string',
    hideErrorMessage: false,
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  };

  state = {
    color: COLORS.TEXT,
    errorMessage: undefined,
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.hideErrorMessage();

    this.setState(() => {
      onFocus();

      return {
        color: COLORS.BLUE,
      };
    });
  };

  onBlur = () => {
    const { onBlur } = this.props;
    const { isValid, errorMessage } = this.isValid();

    this.setState(() => {
      if (isValid) {
        onBlur();

        return {
          color: COLORS.TEXT,
        };
      }

      this.showErrorMessage(errorMessage);
      return null;
    });
  };

  onChange = (e: Object) => {
    const { callbackParams } = this.props;
    const { value } = e.target;
    this.props.onChange(value, callbackParams);
  };

  isValid = () => {
    const { disable, value, placeholder, isRequired, regexArray } = this.props;
    let shouldBreak = false;
    let result = {
      isValid: true,
      errorMessage: undefined,
    };

    if (!disable) {
      if (value === '' || value === undefined) {
        if (isRequired === true) {
          result = {
            isValid: false,
            errorMessage: `${placeholder} is required`,
          };
        }
      } else if (regexArray) {
        regexArray.forEach(check => {
          if (shouldBreak) return;
          const regexResult = check.regex.test(value);

          if (!regexResult) {
            shouldBreak = true;
            result = {
              isValid: false,
              errorMessage: check.errorMessage,
            };
          } else {
            result = {
              isValid: true,
              errorMessage: undefined,
            };
          }
        });
      } else {
        result = {
          isValid: true,
          errorMessage: undefined,
        };
      }
    }

    return result;
  };

  showErrorMessage = (errorMessage: ?string) => {
    this.setState(() => ({
      errorMessage,
      color: COLORS.DANGER,
    }));
  };

  hideErrorMessage = () => {
    this.setState({
      errorMessage: undefined,
      color: COLORS.TEXT,
    });
  };

  render() {
    const {
      icon,
      iconWidth,
      placeholder,
      value,
      disable,
      type,
      width,
      hideErrorMessage,
    } = this.props;
    const { color, errorMessage } = this.state;

    return (
      <div>
        <InputFieldContainer width={width} borderColor={color}>
          {icon && (
            <React.Fragment>
              <Icon icon={icon} width={iconWidth} color={color} />
              <Box mr={Space[3]} />
            </React.Fragment>
          )}
          <StyledInput
            placeholder={placeholder}
            value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={disable}
            type={type}
            fontSize={FONT_SIZES[FONT_TYPES.BODY]}
          />
        </InputFieldContainer>
        {!hideErrorMessage && (
          <ErrorMessage type={FONT_TYPES.CAPTION} color={COLORS.DANGER} width={width}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    );
  }
}

export default InputField;
