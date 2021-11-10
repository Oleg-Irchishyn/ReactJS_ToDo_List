import axios from 'axios';
import { SideBarTodoListsType, TasksType } from '../redux/types/types';

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
  renameTodoListItem: (id: string | number, newVal: string) => {
    return instance
      .patch<SideBarTodoListsType>(`lists/` + id, { name: newVal })
      .then((response) => response.data);
  },
  addNewTodoListTask: (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ) => {
    return instance.post<TasksType>(`tasks`, { id, listId, text, completed }).then((response) => {
      return response.data;
    });
  },
  renameTodoListTask: (id: string | number, newVal: string | number) => {
    return instance
      .patch<TasksType>(`tasks/` + id, { text: newVal })
      .then((response) => response.data);
  },
  removeTodoListTask: (id: string | number) => {
    return instance.delete(`tasks/` + id).then((response) => response.data) as Promise<TasksType>;
  },
  toggleTodoListTaskCompletion: (
    id: string | number,
    listId: string | number | null,
    completed: boolean,
  ) => {
    return instance
      .patch<TasksType>(`tasks/` + id, { listId, completed })
      .then((response) => response.data);
  },
};
