import { AppStateType } from './../store';

export const getTodoListTasks = (state: AppStateType) => {
  return state.tasks.todoListTasks;
};
