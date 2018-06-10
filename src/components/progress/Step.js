import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import { bgColor } from 'styled-system';

import Text from '../text/Text';
import { COLORS, COLORS_VALUES } from '../../base/Colors';
import { FONT_WEIGHTS, FONT_TYPES } from '../../base/Typography';

const pointRadius = '12px';

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

const Step = ({ isDisabled, title, desc }) => {
  const color = isDisabled ? COLORS_VALUES[COLORS.DISABLED] : COLORS_VALUES[COLORS.BLUE];

  return (
    <Flex flexDirection="column" width={1}>
      <Flex flexDirection="row" alignItems="center">
        <Point bg={color} />
        <Line bg={color} />
      </Flex>

      <Flex flexDirection="column" mt={2} ml="6px">
        <Text type={FONT_TYPES.SUBHEADING} fontWeight={FONT_WEIGHTS.SEMI_BOLD} color={color}>
          {title}
        </Text>
        <Text type={FONT_TYPES.CAPTION} color={color}>
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};

Step.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Step;
