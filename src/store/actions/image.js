// @flow
export const IMAGE = {
  SET: 'SET_IMAGE',
  SET_CROPPED: 'SET_CROPPED_IMAGE',
  CONVERT: 'CONVERT_IMAGE',
  CONVERTED: 'CONVERT_IMAGE_SUCCEEDED',
  FAILED: 'CONVERT_IMAGE_FAILED',
};

export const saveImage = (image: String, imageName: String): Object => ({
  type: IMAGE.SET,
  image,
  imageName,
});

export const saveCroppedImage = (image: String, points: Object): Object => ({
  type: IMAGE.SET_CROPPED,
  image,
  points,
});

export const convertImage = (image: string, imageName: String) => ({
  type: IMAGE.CONVERT,
  image,
  imageName,
});

export const convertImageSucceeded = (table: Object) => ({
  type: IMAGE.CONVERTED,
  table,
});

export const convertImageFailed = () => ({
  type: IMAGE.FAILED,
});
