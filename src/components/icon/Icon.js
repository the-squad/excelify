// @flow
import React from 'react';

import { COLORS_VALUES, COLORS } from '../../base/Colors';
import generateKey from '../../base/GenerateKey';

const HEIGHT = 1024;

export type Props = {
  icon: Object,
  width: ?number,
  color?: string,
};

const Icon = (props: Props) => {
  const { icon, width, color } = props;
  const viewBoxWidth = icon.icon.width || HEIGHT;
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

Icon.defaultProps = {
  color: COLORS.TEXT,
};

export default Icon;
