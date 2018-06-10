// @flow
import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

import { COLORS, COLORS_VALUES } from '../../base/Colors';
import { rotate, spin } from '../../base/Animations';

export type Props = {
  radius?: number,
  color?: string,
};

const Spinner = (props: Props) => (
  <StyledSpinner {...props} viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  ${space};

  & .path {
    stroke: ${props => COLORS_VALUES[props.color]};
    stroke-linecap: round;
    animation: ${spin} 1.5s ease-in-out infinite;
  }
`;

Spinner.defaultProps = {
  radius: 40,
  color: COLORS.PRIMARY_BLUE,
};

export default Spinner;
