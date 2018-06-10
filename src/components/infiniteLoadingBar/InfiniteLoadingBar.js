import React from 'react';
import styled from 'styled-components';
import { width } from 'styled-system';

import { indeterminate, indeterminateShort } from '../../base/Animations';
import { COLORS, COLORS_VALUES } from '../../base/Colors';

const ProgressContainer = styled.div`
  background-clip: padding-box;
  background-color: ${COLORS_VALUES[COLORS.PAGE_BACKGROUND]};
  border-radius: 15px;
  display: block;
  height: 4px;
  overflow: hidden;
  position: relative;
  ${width};
`;

const Indeterminate = styled.div`
  background-color: ${COLORS_VALUES[COLORS.PRIMARY_BLUE]};
  border-radius: 15px;

  &::before {
    animation: ${indeterminate} 1.75s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    background-color: inherit;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    will-change: left, right;
  }

  &::after {
    animation: ${indeterminateShort} 1.75s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
    background-color: inherit;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    will-change: left, right;
  }
`;

const InfiniteLoadingBar = props => (
  <ProgressContainer {...props}>
    <Indeterminate />
  </ProgressContainer>
);

export default InfiniteLoadingBar;
