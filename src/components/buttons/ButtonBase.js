import styled from 'styled-components';
import { bgColor } from 'styled-system';

import Space from '../../base/Space';

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  height: 36px;
  padding: 0 ${Space[8]}px;
  transition: all 200ms ease-out;
  outline: none;
  position: relative;
  min-width: 120px;
  ${bgColor};

  &:not(:disabled) {
    cursor: pointer;
  }
`;

export default ButtonBase;
