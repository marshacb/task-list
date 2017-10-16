import * as types from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case types.GET_TASK_LIST_SUCCESS:
      return action.payload;
    case types.POST_TASK_SUCCESS:
      return action.payload;
    case types.DELETE_TASK_SUCCESS:
      return action.payload
      case types.UPDATE_TASK_SUCCESS:
        return action.payload
        case types.FILTER_TASK_SUCCESS:
        return action.payload
    default:
      return state;
  }
}
