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

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case IMAGE.SET: {
      return {
        ...state,
        image: payload.image,
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
