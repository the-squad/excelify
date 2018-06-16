import { combineReducers } from 'redux';

import image from './image';
import sheets from './sheets';
import modals from './modals';

export default combineReducers({
  image,
  sheets,
  modals,
});
