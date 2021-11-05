import { AppStateType } from './../store';

export const getSidebarTodoList = (state: AppStateType) => {
  return state.sidebar.sidebarTodoList.map((item) => {
    item.color = state.sidebar.colors.filter((color) => color.id === item.colorId)[0].hex;
    return item;
  });
};

export const getSelectedTodoListColor = (state: AppStateType) => {
  return state.sidebar.selectedTodoListColor;
};

export const getTodoListColors = (state: AppStateType) => {
  return state.sidebar.colors;
};

export const getIsLoaded = (state: AppStateType) => {
  return state.sidebar.isLoaded;
};

export const getActiveTodoList = (state: AppStateType) => {
  return state.sidebar.activeTodoList;
};
