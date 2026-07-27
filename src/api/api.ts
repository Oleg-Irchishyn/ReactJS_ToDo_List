import axios from 'axios';
import { ColorsType, SideBarTodoListsType, TasksType } from '../redux/types/types';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://projects-db-f2se.onrender.com/',
});

// my-json-server caps db.json at 5 top-level resources, and this repo's quota is
// already spent on quizQuestions/quizForms/quizResults/lists/tasks. Colors are a
// static palette (not user data), so they're kept here instead of a 6th resource.
const TODO_LIST_COLORS: Array<ColorsType> = [
  { id: 1, hex: '#C9D1D3', name: 'grey' },
  { id: 2, hex: '#42B883', name: 'green' },
  { id: 3, hex: '#64C4ED', name: 'blue' },
  { id: 4, hex: '#FFBBCC', name: 'pink' },
  { id: 5, hex: '#B6E6BD', name: 'lime' },
  { id: 6, hex: '#C355F5', name: 'purple' },
  { id: 7, hex: '#110133', name: 'black' },
  { id: 8, hex: '#FF6464', name: 'red' },
];

export const todoAPI = {
  getSidebarTodoList: () => {
    return instance.get(`lists?_embed=tasks`).then((response) => {
      return response.data;
    });
  },
  getTodoListColors: () => {
    return Promise.resolve(TODO_LIST_COLORS);
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
