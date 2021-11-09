import { todoAPI } from './../../api/api';
import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../store';
import { ColorsType, SideBarTodoListsType, TasksType } from '../types/types';

const SET_SIDEBAR_TODO_LIST = 'todoApp/sidebar/SET_SIDEBAR_TODO_LIST';
const SET_TODO_LIST_COLORS = 'todoApp/sidebar/SET_TODO_LIST_COLORS';
const ADD_NEW_TODO_LIST_ITEM = 'todoApp/sidebar/ADD_NEW_TODO_LIST_ITEM';
const SET_SELECTED_TODO_LIST_COLOR = 'todoApp/sidebar/SET_SELECTED_TODO_LIST_COLOR';
const ISLOADED_SUCCESS = 'todoApp/ISLOADED_SUCCESS';
const DELETE_TODO_LIST_ITEM = 'todoApp/sidebar/DELETE_TODO_LIST_ITEM';
const SET_AVTIVE_TODO_LIST = 'todoApp/sidebar/SET_AVTIVE_TODO_LIST';
const ADD_NEW_ACTIVE_TODO_LIST_TASK = 'todoApp/sidebar/ADD_NEW_ACTIVE_TODO_LIST_TASK';

let initialState = {
  sidebarTodoList: [] as Array<SideBarTodoListsType>,
  colors: [] as Array<ColorsType>,
  selectedTodoListColor: 1 as number | string,
  isLoaded: false as boolean,
  activeTodoList: JSON.parse(
    localStorage.getItem('activeTodoList') || '{}',
  ) as SideBarTodoListsType | null,
};

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case ISLOADED_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
      };
    }
    case SET_SIDEBAR_TODO_LIST: {
      return {
        ...state,
        sidebarTodoList: action.payload,
      };
    }
    case SET_TODO_LIST_COLORS: {
      return {
        ...state,
        colors: action.payload,
      };
    }
    case ADD_NEW_TODO_LIST_ITEM: {
      return {
        ...state,
        isLoaded: false,
        sidebarTodoList: [...state.sidebarTodoList, action.payload],
      };
    }
    case SET_SELECTED_TODO_LIST_COLOR: {
      return {
        ...state,
        selectedTodoListColor: action.payload,
      };
    }
    case DELETE_TODO_LIST_ITEM: {
      const updatedTodoListItems = [...state.sidebarTodoList].filter(
        (item) => item.id !== action.id,
      );
      return {
        ...state,
        sidebarTodoList: updatedTodoListItems,
      };
    }
    case SET_AVTIVE_TODO_LIST: {
      return {
        ...state,
        activeTodoList: action.payload,
      };
    }
    case ADD_NEW_ACTIVE_TODO_LIST_TASK: {
      if (state.activeTodoList && state.activeTodoList.tasks) {
        const newTodoTaskList = [...state.activeTodoList.tasks, action.payload];
        return {
          ...state,
          activeTodoList: {
            ...state.activeTodoList,
            tasks: newTodoTaskList,
          },
        };
      }
      break;
    }
    default:
      return state;
  }
  return state;
};

export const actions = {
  setSidebarTodoList: (lists: Array<SideBarTodoListsType>) =>
    ({ type: SET_SIDEBAR_TODO_LIST, payload: lists } as const),
  setTodoListColors: (colors: Array<ColorsType>) =>
    ({ type: SET_TODO_LIST_COLORS, payload: colors } as const),
  addNewTodoList: (item: SideBarTodoListsType) =>
    ({ type: ADD_NEW_TODO_LIST_ITEM, payload: item } as const),
  setSelectedTodoListColor: (val: number | string) =>
    ({ type: SET_SELECTED_TODO_LIST_COLOR, payload: val } as const),
  isLoadedSuccess: () => ({ type: ISLOADED_SUCCESS } as const),
  deleteTodoListItem: (id: string | number) =>
    ({
      type: DELETE_TODO_LIST_ITEM,
      id,
    } as const),
  setActiveTodoList: (obj: SideBarTodoListsType | null) =>
    ({ type: SET_AVTIVE_TODO_LIST, payload: obj } as const),
  setNewActiveTodoListTask: (task: TasksType) =>
    ({
      type: ADD_NEW_ACTIVE_TODO_LIST_TASK,
      payload: task,
    } as const),
};

export const getAllSidebarTodoList = (): ThunkType => async (dispatch) => {
  try {
    let data = await todoAPI.getSidebarTodoList();
    dispatch(actions.setSidebarTodoList(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.isLoadedSuccess());
  }
};

export const getAllTodoListColors = (): ThunkType => async (dispatch) => {
  try {
    let data = await todoAPI.getTodoListColors();
    dispatch(actions.setTodoListColors(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.isLoadedSuccess());
  }
};

export const deleteSidebarTodoList =
  (id: string | number): ThunkType =>
  async (dispatch) => {
    try {
      await todoAPI.removeTodoListItem(id);
      dispatch(actions.deleteTodoListItem(id));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.isLoadedSuccess());
    }
  };

export const setNewTodoListItem =
  (id: string | number, name: string, colorId: string | number): ThunkType =>
  async (dispatch) => {
    try {
      let data = await todoAPI.addNewTodoListItem(id, name, colorId);
      dispatch(actions.addNewTodoList(data));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.isLoadedSuccess());
    }
  };

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default appReducer;
