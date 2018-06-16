// @flow

import { MODALS } from '../actions/modals';

const initialState = {
  uploadModal: false,
};

export default (state: Object = initialState, { type }: Object) => {
  switch (type) {
    case MODALS.UPLOAD.OPEN:
      return {
        uploadModal: true,
      };

    case MODALS.UPLOAD.CLOSE:
      return {
        uploadModal: false,
      };

    default:
      return state;
  }
};
