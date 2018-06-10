// @flow
export const IMAGE = {
  SET: 'SET_IMAGE',
};

export const saveImage = (image: String): Object => ({
  type: IMAGE.SET,
  image,
});
