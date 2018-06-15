// @flow
import { IMAGE } from '../actions/image';

const initialState = {
  image: undefined,
  croppedImagePoints: {
    x: 20,
    y: 10,
    width: 30,
    height: 10,
  },
  croppedImage: undefined,
};

export default (state: Object = initialState, { type, ...payload }: Object) => {
  switch (type) {
    case IMAGE.SET: {
      return {
        ...state,
        image: payload.image,
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

    default:
      return state;
  }
};
