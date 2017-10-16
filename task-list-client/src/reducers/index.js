import { combineReducers } from 'redux';
import taskReducer from './taskReducer'
import formReducer from './formReducer'
const rootReducer = combineReducers({

  formState: formReducer,
  taskList: taskReducer
});

export default rootReducer;
