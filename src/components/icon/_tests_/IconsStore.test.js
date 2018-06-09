import 'jest-enzyme';

import IconsStore from '../IconsStore';
import icons from './icons.json';
import clinicIcon from './clinicIcon.json';

describe('IconLoader', () => {
  IconsStore.setIcons(icons);

  it('should set icons', () => {
    const iconsStore = IconsStore.getIcons();
    expect(iconsStore).toEqual(icons);
  });

  it('should return correct icon', () => {
    const icon = IconsStore.getIcon('clinic');
    expect(icon).toEqual(clinicIcon);
  });

  it('should return empty object when icon not found', () => {
    const icon = IconsStore.getIcon('test');
    expect(icon).toEqual({});
  });
});
