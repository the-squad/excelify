import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';

import Step from './Step';

const Progress = ({ steps, currentStep }) => (
  <Flex width={1}>
    {steps.map((step, index) => (
      <Step key={step.title} isDisabled={currentStep < index} title={step.title} desc={step.desc} />
    ))}
  </Flex>
);

Progress.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      desc: PropTypes.string,
    }),
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Progress;
