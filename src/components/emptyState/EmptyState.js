import React from 'react';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';

import { FONT_TYPES } from '../../base/Typography';
import { COLORS } from '../../base/Colors';

type Props = {
  icon: string,
  text: string,
};

const EmptyState = (props: Props) => (
  <Flex alignItems="center" justifyContent="center" flexDirection="column" width={1}>
    {props.icon && (
      <Icon icon={IconsStore.getIcon(props.icon)} width={50} color={COLORS.DISABLED} />
    )}
    <Text type={FONT_TYPES.TITLE} color={COLORS.DISABLED} mt={3}>
      {props.text}
    </Text>
  </Flex>
);

export default EmptyState;
