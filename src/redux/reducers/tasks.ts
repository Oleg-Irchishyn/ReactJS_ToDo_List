import { todoAPI } from './../../api/api';
import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../store';
import { TasksType } from '../types/types';
import { actions as sbActions } from './sidebar';

const SET_TODO_LIST_TASKS = 'todoApp/tasks/SET_TODO_LIST_TASKS';
const ADD_NEW_TODO_LIST_TASKS = 'todoApp/tasks/ADD_NEW_TODO_LIST_TASKS';

const CHANGE_TODO_LIST_TASK_NAME = 'todoApp/tasks/CHANGE_TODO_LIST_TASK_NAME';

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
    case ADD_NEW_TODO_LIST_TASKS: {
      return {
        ...state,
        todoListTasks: [...state.todoListTasks, action.payload],
      };
    }
    case CHANGE_TODO_LIST_TASK_NAME: {
      const newTaskName = [...state.todoListTasks].map((item) => {
        if (item.id === action.id) {
          item.text = action.text;
        }
        return item;
      });

      return {
        ...state,
        todoListTasks: newTaskName,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setTodoListTasks: (tasks: Array<TasksType>) =>
    ({ type: SET_TODO_LIST_TASKS, payload: tasks } as const),
  setNewTodoListTask: (task: TasksType) =>
    ({
      type: ADD_NEW_TODO_LIST_TASKS,
      payload: task,
    } as const),
  changeTodoListTaskName: (id: string | number, text: string | number) =>
    ({ type: CHANGE_TODO_LIST_TASK_NAME, id, text } as const),
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

export const setNewTodoListTaskSuccess =
  (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ): ThunkType =>
  async (dispatch) => {
    try {
      let data = await todoAPI.addNewTodoListTask(id, listId, text, completed);
      dispatch(actions.setNewTodoListTask(data));
      dispatch(sbActions.setNewActiveTodoListTask(data));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(sbActions.isLoadedSuccess());
    }
  };

export const setNewTodoListTaskName =
  (id: string | number, newVal: string | number): ThunkType =>
  async (dispatch) => {
    try {
      await todoAPI.renameTodoListTask(id, newVal);
      dispatch(actions.changeTodoListTaskName(id, newVal));
      dispatch(sbActions.changeActiveTodoListTaskName(id, newVal));
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
