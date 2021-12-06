import { AppStateType } from './../store';

export const getSidebarTodoList = (state: AppStateType) => {
  return state.sidebar.sidebarTodoList.map((item) => {
    const colorHex = state.sidebar.colors.filter((color) => color.id === item.colorId)[0].hex;
    const colorName = state.sidebar.colors.filter((color) => color.id === item.colorId)[0].name;
    colorHex ? (item.color = colorHex) : (item.color = colorName);
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
