import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, width, fontSize, color, fontWeight, lineHeight } from 'styled-system';

import { FONT_SIZES, FONT_WEIGHTS, FONT_TYPES } from '../../base/Typography';
import { COLORS } from '../../base/Colors';

const propTypes = {
  fontWeight: PropTypes.oneOf(Object.values(FONT_WEIGHTS)),
  fontSize: PropTypes.oneOf(Object.values(FONT_SIZES)),
  color: PropTypes.oneOf(Object.values(COLORS)),
  tag: PropTypes.string,
  children: PropTypes.string.isRequired,
};

/**
 * Default props will render <label type="body" />
 */
const defaultProps = {
  fontWeight: FONT_WEIGHTS.NORMAL,
  fontSize: FONT_SIZES[FONT_TYPES.BODY],
  color: COLORS.TEXT,
  tag: 'label',
};

/**
 * Generate basic HTML node
 * @param {object} props
 */
const Base = props => {
  const Tag = props.tag;
  return <Tag {...props}>{props.children}</Tag>;
};

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;

const Text = styled(Base)`
  ${space}
  ${width}
  ${color}
  ${fontWeight}
  ${fontSize}
  ${lineHeight}
  font-display: fallback;
`;

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

const TextHOC = props => {
  const { type } = props;
  return <Text {...props} fontSize={FONT_SIZES[type]} />;
};

TextHOC.propTypes = {
  type: PropTypes.oneOf(Object.values(FONT_TYPES)),
};

TextHOC.defaultProps = {
  type: FONT_TYPES.BODY,
};

export default TextHOC;
