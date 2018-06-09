import { IMAGE } from '../actions/image';

const initialState = {
  image: undefined,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case IMAGE.SET: {
      return {
        image: payload.image,
      };
    }

    default:
      return state;
  }
};
