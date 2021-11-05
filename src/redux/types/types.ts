export type SideBarTodoListsType = {
  id: string | number;
  active?: boolean;
  name: string;
  colorId: string | number;
  color?: string;
  tasks?: Array<TasksType> | undefined;
};

export type TasksType = {
  id: string | number;
  listId: string | number | null;
  text: string | number | any;
  completed: boolean;
};

export type ColorsType = {
  id: string | number;
  hex: string;
  name: string;
};
