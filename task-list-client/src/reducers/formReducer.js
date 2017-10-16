import { UPDATE_FORM_SUCCESS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FORM_SUCCESS:
      return {
        ...state,
        ...state.formState,
        ...action.payload.formState
      };
    default:
      return state;
  }
};
