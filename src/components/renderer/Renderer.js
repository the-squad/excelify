import { prop } from 'ramda';

const create = (type, data) => ({
  type,
  ...data,
  fold: definitions => {
    const fn = prop(type, definitions);
    return fn ? fn(data) : undefined;
  },
});

const STATES = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  FAILURE: 'FAILURE',
  SUCCESS: 'SUCCESS',
};

const renderer = {
  init: (...args) => create(STATES.NOT_LOADED, ...args),
  loading: (...args) => create(STATES.LOADING, ...args),
  empty: (...args) => create(STATES.EMPTY, ...args),
  failure: (...args) => create(STATES.FAILURE, ...args),
  success: (...args) => create(STATES.SUCCESS, ...args),
};

export { STATES, renderer };
export default renderer;
