import { todoAPI } from '../../../../api/api';
import { TasksType } from '../../../types/types';
import {
  getAllTodoListTasks,
  setNewTodoListTaskSuccess,
  setNewTodoListTaskName,
  deleteTodoListTask,
  toggleTaskCompletion,
  actions,
} from '../../tasks';
import { actions as sbActions } from '../../sidebar';
jest.mock('../../../../api/api');

const todoAPIMock = todoAPI as jest.Mocked<typeof todoAPI>;

describe('tasks thunks test', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let result: TasksType[] | TasksType;

  test('getAllTodoListTasks thunk', async () => {
    result = [
      {
        id: 1,
        listId: 2,
        text: 'Learn JavaScript',
        completed: false,
      },
      {
        id: 2,
        listId: 2,
        text: 'Learn project patterns',
        completed: false,
      },
      {
        id: 3,
        listId: 2,
        text: 'ReactJS Hooks (useState, useReducer, useEffect и etc.)',
        completed: true,
      },
    ];

    todoAPIMock.getTodoListTasks.mockReturnValue(Promise.resolve(result));
    const thunk = getAllTodoListTasks();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setTodoListTasks(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, sbActions.isLoadedSuccess());
  });

  test('setNewTodoListTaskSuccess  thunk', async () => {
    let result = {
      id: 1,
      listId: 2,
      text: 'Learn JavaScript',
      completed: false,
    };

    todoAPIMock.addNewTodoListTask.mockReturnValue(Promise.resolve(result));
    const thunk = setNewTodoListTaskSuccess(
      result.id,
      result.listId,
      result.text,
      result.completed,
    );
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setNewTodoListTask(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, sbActions.setNewActiveTodoListTask(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, sbActions.isLoadedSuccess());
  });

  test('setNewTodoListTaskName thunk', async () => {
    let result = {
      id: 1,
      listId: 2,
      text: 'Learn JavaScript',
      completed: false,
    };

    todoAPIMock.renameTodoListTask.mockReturnValue(Promise.resolve(result));
    const thunk = setNewTodoListTaskName(result.id, 'Learn Java');
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      actions.changeTodoListTaskName(result.id, 'Learn Java'),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      sbActions.changeActiveTodoListTaskName(result.id, 'Learn Java'),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, sbActions.isLoadedSuccess());
  });

  test('deleteTodoListTask thunk', async () => {
    let result = {
      id: 1,
      listId: 2,
      text: 'Learn JavaScript',
      completed: false,
    };

    todoAPIMock.removeTodoListTask.mockReturnValue(Promise.resolve(result));
    const thunk = deleteTodoListTask(result.id);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.deleteTodoListTaskItem(result.id));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, sbActions.deleteActiveTodoListTask(result.id));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, sbActions.isLoadedSuccess());
  });

  test('toggleTaskCompletion thunk', async () => {
    let result = {
      id: 1,
      listId: 2,
      text: 'Learn JavaScript',
      completed: false,
    };

    todoAPIMock.toggleTodoListTaskCompletion.mockReturnValue(Promise.resolve(result));
    const thunk = toggleTaskCompletion(result.id, result.listId, result.completed);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      actions.changeTodoListTaskCompletion(result.id, false),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      sbActions.changeActiveTodoListTaskCompletion(result.id, false),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, sbActions.isLoadedSuccess());
  });
});
