// @flow
import React from 'react';
import { Flex } from 'grid-styled';

import Step from './Step';

export type Props = {
  steps: Array<{
    title: string,
    desc: string,
  }>,
  currentStep: number,
};

const Progress = (props: Props) => {
  const { steps, currentStep } = props;

  return (
    <Flex width={1}>
      {steps.map((step, index) => (
        <Step
          key={step.title}
          isDisabled={currentStep < index}
          title={step.title}
          desc={step.desc}
        />
      ))}
    </Flex>
  );
};

export default Progress;
