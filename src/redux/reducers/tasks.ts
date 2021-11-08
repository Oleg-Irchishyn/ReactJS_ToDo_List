import { todoAPI } from './../../api/api';
import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../store';
import { TasksType } from '../types/types';
import { actions as sbActions } from './sidebar';

const SET_TODO_LIST_TASKS = 'todoApp/SET_TODO_LIST_TASKS';

let initialState = {
  todoListTasks: [] as Array<TasksType>,
};

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case SET_TODO_LIST_TASKS: {
      return {
        ...state,
        todoListTasks: action.payload,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setTodoListTasks: (tasks: Array<TasksType>) =>
    ({ type: SET_TODO_LIST_TASKS, payload: tasks } as const),
};

export const getAllTodoListTasks = (): ThunkType => async (dispatch) => {
  try {
    let data = await todoAPI.getTodoListTasks();
    dispatch(actions.setTodoListTasks(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(sbActions.isLoadedSuccess());
  }
};

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default appReducer;
