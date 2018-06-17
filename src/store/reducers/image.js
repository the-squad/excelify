// @flow

import { IMAGE } from '../actions/image';

const initialState = {
  image: undefined,
  imageName: undefined,
  croppedImagePoints: {
    x: 20,
    y: 10,
    width: 30,
    height: 10,
  },
  croppedImage: undefined,
  isConverting: false,
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case IMAGE.SET: {
      return {
        ...state,
        image: payload.image,
        imageName: payload.imageName,
        croppedImage: payload.image,
      };
    }

    case IMAGE.SET_CROPPED: {
      return {
        ...state,
        croppedImagePoints: payload.points,
        croppedImage: payload.image,
      };
    }

    case IMAGE.CONVERT: {
      return {
        ...state,
        isConverting: true,
      };
    }

    case IMAGE.CONVERTED: {
      return {
        image: undefined,
        imageName: undefined,
        croppedImagePoints: {
          x: 20,
          y: 10,
          width: 30,
          height: 10,
        },
        croppedImage: undefined,
        isConverting: false,
      };
    }

    case IMAGE.FAILED: {
      return {
        ...state,
        isConverting: false,
      };
    }

    default:
      return state;
  }
};
