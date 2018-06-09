import React from 'react';
import PropTypes from 'prop-types';

import { COLORS_VALUES, COLORS } from '../../base/Colors';
import generateKey from '../../base/GenerateKey';

const HEIGHT = 1024;

const Icon = props => {
  const { icon, width, color } = props;
  const viewBoxWidth = icon.icon.width;
  const viewBox = `0 0 ${viewBoxWidth} ${HEIGHT}`;
  const { paths } = icon.icon;

  return (
    <svg viewBox={viewBox} width={width} {...props}>
      <g>
        {paths.map(path => <path fill={COLORS_VALUES[color]} key={generateKey('path')} d={path} />)}
      </g>
    </svg>
  );
};

export const iconPropTypes = PropTypes.shape({
  paths: PropTypes.array,
  width: PropTypes.number,
  attrs: PropTypes.array,
  isMulticolor: PropTypes.bool,
  isMulticolor2: PropTypes.bool,
  colorPermutations: PropTypes.any,
  tags: PropTypes.array,
  grid: PropTypes.number,
});

Icon.propTypes = {
  icon: iconPropTypes.isRequired,
  width: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: COLORS.TEXT,
};

export default Icon;
