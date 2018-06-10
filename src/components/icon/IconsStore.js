// @flow

let instance = null;
declare type iconsType = Object;

class IconsStore {
  icons: iconsType = {};

  static setIcons = (icons: iconsType) => {
    if (!instance) {
      instance = new IconsStore();
    }
    instance.icons = icons;
  };

  static getIcons = (): iconsType => {
    if (!instance) {
      instance = new IconsStore();
    }
    return instance.icons;
  };

  static getIcon = (name: string): Object => {
    if (!instance) {
      instance = new IconsStore();
    }

    const iconName = name;
    let requestedIcon = instance.icons.icons.filter(icon => icon.properties.name === iconName);
    if (requestedIcon.length === 0) {
      requestedIcon = {};
    } else {
      requestedIcon = requestedIcon.pop();
    }

    return requestedIcon;
  };
}

export default IconsStore;
