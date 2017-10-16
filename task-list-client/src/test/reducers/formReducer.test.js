import formReducer from "../../reducers/formReducer";
import * as types from "../../actions/types";

describe("taskReducer", () => {
  it("handles UPDATE_FORM_SUCCESS", () => {
    const formState = { taskDescription: "the description" };
    const state = formReducer(
      {},
      {
        type: types.UPDATE_FORM_SUCCESS,
        payload: { formState }
      }
    );

    expect(state).toEqual({
      taskDescription: "the description"
    });
  });
});
