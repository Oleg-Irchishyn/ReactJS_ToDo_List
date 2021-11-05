import axios from 'axios';
import { SideBarTodoListsType } from '../redux/types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001/',
});

export const todoAPI = {
  getSidebarTodoList: () => {
    return instance.get(`lists?_expand=color&_embed=tasks`).then((response) => {
      return response.data;
    });
  },
  getTodoListColors: () => {
    return instance.get(`colors`).then((response) => {
      return response.data;
    });
  },
  getTodoListTasks: () => {
    return instance.get(`tasks`).then((response) => {
      return response.data;
    });
  },
  addNewTodoListItem: (id: string | number, name: string, colorId: string | number) => {
    return instance.post<SideBarTodoListsType>(`lists`, { id, name, colorId }).then((response) => {
      return response.data;
    });
  },
  removeTodoListItem: (id: string | number) => {
    return instance
      .delete(`lists/` + id)
      .then((response) => response.data) as Promise<SideBarTodoListsType>;
  },
};
