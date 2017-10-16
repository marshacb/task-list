import taskReducer from "../../reducers/taskReducer";
import * as types from "../../actions/types";

describe("taskReducer", () => {
  it("handles GET_TASK_LIST_SUCCESS", () => {
    const tasks = [
      { task1: { description: "task" } },
      { task1: { description: "task" } }
    ];
    const state = taskReducer([], {
      type: types.GET_TASK_LIST_SUCCESS,
      payload: { tasks }
    });

    expect(state).toEqual({
      tasks: [
        { task1: { description: "task" } },
        { task1: { description: "task" } }
      ]
    });
  });

  it("handles POST_TASK_SUCCESS", () => {
    const tasks = [
      { task1: { description: "task" } },
      { task1: { description: "task" } }
    ];
    const state = taskReducer([], {
      type: types.POST_TASK_SUCCESS,
      payload: { tasks }
    });

    expect(state).toEqual({
      tasks: [
        { task1: { description: "task" } },
        { task1: { description: "task" } }
      ]
    });
  });

  it("handles DELETE_TASK_SUCCESS", () => {
    const tasks = [
      { task1: { description: "task" } },
      { task1: { description: "task" } }
    ];
    const state = taskReducer([], {
      type: types.DELETE_TASK_SUCCESS,
      payload: { tasks }
    });

    expect(state).toEqual({
      tasks: [
        { task1: { description: "task" } },
        { task1: { description: "task" } }
      ]
    });
  });

  it("handles UPDATE_TASK_SUCCESS", () => {
    const tasks = [
      { task1: { description: "task" } },
      { task1: { description: "task" } }
    ];
    const state = taskReducer([], {
      type: types.UPDATE_TASK_SUCCESS,
      payload: { tasks }
    });

    expect(state).toEqual({
      tasks: [
        { task1: { description: "task" } },
        { task1: { description: "task" } }
      ]
    });
  });

  it("handles FILTER_TASK_SUCCESS", () => {
    const tasks = [
      { task1: { description: "task" } },
      { task1: { description: "task" } }
    ];
    const state = taskReducer([], {
      type: types.FILTER_TASK_SUCCESS,
      payload: { tasks }
    });

    expect(state).toEqual({
      tasks: [
        { task1: { description: "task" } },
        { task1: { description: "task" } }
      ]
    });
  });
});
