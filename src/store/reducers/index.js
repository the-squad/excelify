import { combineReducers } from 'redux';

import image from './image';
import sheets from './sheets';
import modals from './modals';
import user from './user';

export default combineReducers({
  image,
  sheets,
  modals,
  user,
});
