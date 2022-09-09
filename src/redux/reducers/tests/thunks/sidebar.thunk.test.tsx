import { todoAPI } from '../../../../api/api';
import { ColorsType, SideBarTodoListsType } from '../../../types/types';
import {
  getAllSidebarTodoList,
  getAllTodoListColors,
  deleteSidebarTodoList,
  changeTodoListItemName,
  setNewTodoListItem,
  actions,
} from '../../sidebar';
jest.mock('../../../../api/api');

const todoAPIMock = todoAPI as jest.Mocked<typeof todoAPI>;

describe('sidebar thunks test', () => {
  let result: SideBarTodoListsType[] | ColorsType[] | SideBarTodoListsType;

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllSidebarTodoList thunk', async () => {
    result = [
      {
        id: 1,
        name: 'Sales',
        colorId: 5,
        tasks: [
          {
            id: 'ff107594-d72b-49fa-9835-6db33effca35',
            listId: 1,
            text: 'Sour Cream',
            completed: true,
          },
          {
            id: 22,
            listId: 1,
            text: 'new task',
            completed: false,
          },
          {
            id: 23,
            listId: 1,
            text: 'Chicken Soup',
            completed: false,
          },
        ],
        color: '#B6E6BD',
      },
      {
        id: 2,
        name: 'Front-end',
        colorId: 4,
        tasks: [
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
          {
            id: 4,
            listId: 2,
            text: 'Redux (redux-observable, redux-saga)',
            completed: true,
          },
        ],
        color: '#FFBBCC',
      },
      {
        id: 3,
        name: 'TV films and series?',
        colorId: 3,
        tasks: [
          {
            id: '95871b52-4c49-488e-a639-5d34c42f2a8d',
            listId: 3,
            text: 'Stranger Things',
            completed: true,
          },
          {
            id: '492018b0-cf8c-458a-8fc6-17e3fe946839',
            listId: 3,
            text: "Darrel's squirrel",
            completed: false,
          },
        ],
        color: '#64C4ED',
      },
    ];

    todoAPIMock.getSidebarTodoList.mockReturnValue(Promise.resolve(result));
    const thunk = getAllSidebarTodoList();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setSidebarTodoList(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.isLoadedSuccess());
  });

  test('getTodoListColors thunk', async () => {
    let result = [
      {
        id: 1,
        hex: '#C9D1D3',
        name: 'grey',
      },
      {
        id: 2,
        hex: '#42B883',
        name: 'green',
      },
      {
        id: 3,
        hex: '#64C4ED',
        name: 'blue',
      },
    ];
    todoAPIMock.getTodoListColors.mockReturnValue(Promise.resolve(result));
    const thunk = getAllTodoListColors();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setTodoListColors(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.isLoadedSuccess());
  });

  test('deleteSidebarTodoList thunk', async () => {
    result = [
      {
        id: 1,
        name: 'Sales',
        colorId: 5,
        tasks: [
          {
            id: 'ff107594-d72b-49fa-9835-6db33effca35',
            listId: 1,
            text: 'Sour Cream',
            completed: true,
          },
          {
            id: 22,
            listId: 1,
            text: 'new task',
            completed: false,
          },
          {
            id: 23,
            listId: 1,
            text: 'Chicken Soup',
            completed: false,
          },
        ],
        color: '#B6E6BD',
      },
      {
        id: 2,
        name: 'Front-end',
        colorId: 4,
        tasks: [
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
          {
            id: 4,
            listId: 2,
            text: 'Redux (redux-observable, redux-saga)',
            completed: true,
          },
        ],
        color: '#FFBBCC',
      },
      {
        id: 3,
        name: 'TV films and series?',
        colorId: 3,
        tasks: [
          {
            id: '95871b52-4c49-488e-a639-5d34c42f2a8d',
            listId: 3,
            text: 'Stranger Things',
            completed: true,
          },
          {
            id: '492018b0-cf8c-458a-8fc6-17e3fe946839',
            listId: 3,
            text: "Darrel's squirrel",
            completed: false,
          },
        ],
        color: '#64C4ED',
      },
    ];

    todoAPIMock.removeTodoListItem.mockReturnValue(Promise.resolve(result[2]));
    const thunk = deleteSidebarTodoList(result[2].id);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.deleteTodoListItem(result[2].id));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.isLoadedSuccess());
  });

  test('changeTodoListItemName  thunk', async () => {
    result = [
      {
        id: 1,
        name: 'Sales',
        colorId: 5,
        tasks: [
          {
            id: 'ff107594-d72b-49fa-9835-6db33effca35',
            listId: 1,
            text: 'Sour Cream',
            completed: true,
          },
          {
            id: 22,
            listId: 1,
            text: 'new task',
            completed: false,
          },
          {
            id: 23,
            listId: 1,
            text: 'Chicken Soup',
            completed: false,
          },
        ],
        color: '#B6E6BD',
      },
    ];

    todoAPIMock.renameTodoListItem.mockReturnValue(Promise.resolve(result[0]));
    const thunk = changeTodoListItemName(result[0].id, 'newTitle');
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      actions.changeTodoListItemName(result[0].id, 'newTitle'),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      actions.changeActiveTodoListName(result[0].id, 'newTitle'),
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.isLoadedSuccess());
  });

  test('setNewTodoListItem  thunk', async () => {
    let result = {
      id: 10,
      name: 'Some Crap',
      colorId: 7,
    };

    todoAPIMock.addNewTodoListItem.mockReturnValueOnce(Promise.resolve(result));
    const thunk = setNewTodoListItem(result.id, result.name, result.colorId);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.addNewTodoList(result));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.isLoadedSuccess());
  });
});
