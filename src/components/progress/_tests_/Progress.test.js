import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

import Progress from '../Progress';
import Step from '../Step';

configure({ adapter: new Adapter() });

describe('Progress', () => {
  const steps = [
    {
      title: 'Upload Image',
      desc: 'Upload Image desc',
    },
    {
      title: 'Crop Image',
      desc: 'Crop Image desc',
    },
    {
      title: 'Edit Image',
      desc: 'Edit Image desc',
    },
  ];

  it('should render', () => {
    const tree = render(<Progress steps={steps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the exact number of steps', () => {
    const tree = shallow(<Progress steps={steps} />);
    const numberOfSteps = tree.children();
    expect(numberOfSteps.length).toEqual(3);
  });

  it('should highlight the correct steps', () => {
    const tree = shallow(<Progress steps={steps} currentStep={1} />);
    const stepsComponents = tree.find(Step);
    const firstStep = stepsComponents.getElements()[0].props.isDisabled;
    const secondStep = stepsComponents.getElements()[1].props.isDisabled;
    const thirdStep = stepsComponents.getElements()[2].props.isDisabled;
    expect(firstStep).toEqual(false);
    expect(secondStep).toEqual(false);
    expect(thirdStep).toEqual(true);
  });
});
