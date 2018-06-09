export const IMAGE = {
  SET: 'SET_IMAGE',
};

export const saveImage = image => ({
  type: IMAGE.SET,
  image,
});
