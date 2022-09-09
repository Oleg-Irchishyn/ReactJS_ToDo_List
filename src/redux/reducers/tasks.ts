import { todoAPI } from './../../api/api';
import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../store';
import { TasksType } from '../types/types';
import { actions as sbActions } from './sidebar';

const SET_TODO_LIST_TASKS = 'todoApp/tasks/SET_TODO_LIST_TASKS';
const ADD_NEW_TODO_LIST_TASKS = 'todoApp/tasks/ADD_NEW_TODO_LIST_TASKS';
const CHANGE_TODO_LIST_TASK_NAME = 'todoApp/tasks/CHANGE_TODO_LIST_TASK_NAME';
const DELETE_TASKS_LIST_ITEM = 'todoApp/tasks/DELETE_TASKS_LIST_ITEM';
const CHANGE_TODO_LIST_TASK_COMPLETION = 'todoApp/tasks/CHANGE_TODO_LIST_TASK_COMPLETION';

let initialState = {
  todoListTasks: [] as Array<TasksType>,
};

const tasksReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
    case DELETE_TASKS_LIST_ITEM: {
      const updatedTodoListItems = [...state.todoListTasks].filter((item) => item.id !== action.id);
      return {
        ...state,
        todoListTasks: updatedTodoListItems,
      };
    }
    case CHANGE_TODO_LIST_TASK_COMPLETION: {
      const newTodoTasksList = [...state.todoListTasks].map((item) => {
        if (item.id === action.id) {
          item.completed = action.completed;
        }
        return item;
      });

      return {
        ...state,
        todoListTasks: newTodoTasksList,
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
  deleteTodoListTaskItem: (id: string | number) => ({ type: DELETE_TASKS_LIST_ITEM, id } as const),
  changeTodoListTaskCompletion: (id: string | number, completed: boolean) =>
    ({ type: CHANGE_TODO_LIST_TASK_COMPLETION, id, completed } as const),
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

export const deleteTodoListTask =
  (id: string | number): ThunkType =>
  async (dispatch) => {
    try {
      await todoAPI.removeTodoListTask(id);
      dispatch(actions.deleteTodoListTaskItem(id));
      dispatch(sbActions.deleteActiveTodoListTask(id));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(sbActions.isLoadedSuccess());
    }
  };

export const toggleTaskCompletion =
  (id: string | number, listId: string | number | null, completed: boolean): ThunkType =>
  async (dispatch) => {
    try {
      await todoAPI.toggleTodoListTaskCompletion(id, listId, completed);
      dispatch(actions.changeTodoListTaskCompletion(id, completed));
      dispatch(sbActions.changeActiveTodoListTaskCompletion(id, completed));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(sbActions.isLoadedSuccess());
    }
  };

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default tasksReducer;
