// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { bgColor } from 'styled-system';

import Text from '../text/Text';
import { COLORS, COLORS_VALUES } from '../../base/Colors';
import { FONT_WEIGHTS, FONT_TYPES } from '../../base/Typography';

const pointRadius = '10px';

const Point = styled.div`
  ${bgColor};
  max-height: ${pointRadius};
  max-width: ${pointRadius};
  min-height: ${pointRadius};
  min-width: ${pointRadius};
  border-radius: 50%;
`;

const Line = styled.div`
  ${bgColor};
  border-radius: 15px;
  width: 102%;
  height: 4px;
  margin-right: -4px;
  margin-left: -4px;
`;

export type Props = {
  isDisabled: boolean,
  title: string,
  desc: string,
};

const Step = (props: Props) => {
  const { isDisabled, title, desc } = props;
  const color = isDisabled ? COLORS.DISABLED : COLORS.BLUE;

  return (
    <Flex flexDirection="column" width={1}>
      <Flex flexDirection="row" alignItems="center">
        <Point bg={COLORS_VALUES[color]} />
        <Line bg={COLORS_VALUES[color]} />
      </Flex>

      <Flex flexDirection="column" mt={2} ml="6px">
        <Text type={FONT_TYPES.BODY} fontWeight={FONT_WEIGHTS.SEMI_BOLD} color={color}>
          {title}
        </Text>
        <Text type={FONT_TYPES.CAPTION} color={color}>
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Step;
