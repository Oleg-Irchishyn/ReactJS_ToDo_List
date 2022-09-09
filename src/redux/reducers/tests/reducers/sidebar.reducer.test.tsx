import React from 'react';
import { ColorsType, SideBarTodoListsType } from '../../../types/types';

import sidebarReducer, { actions } from '../../sidebar';

describe('sidebar reducer', () => {
  let state;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`setSidebarTodoList action test`, () => {
    state = {
      sidebarTodoList: [] as Array<SideBarTodoListsType>,
      colors: [] as Array<ColorsType>,
      selectedTodoListColor: 1 as number | string,
      isLoaded: false as boolean,
      activeTodoList: JSON.parse(localStorage.getItem('activeTodoList') || '{}') as
        | SideBarTodoListsType
        | '',
    };
    let todoList = [
      {
        id: 1,
        name: 'Sales',
        colorId: 5,
      },
      {
        id: 2,
        name: 'Front-end',
        colorId: 4,
      },
      {
        id: 3,
        name: 'TV films and series?',
        colorId: 3,
      },
    ];
    let action = actions.setSidebarTodoList(todoList);
    let newState = sidebarReducer(state, action);
    expect(newState.sidebarTodoList.length).toBe(3);
  });

  test(`setTodoListColors test`, () => {
    state = {
      sidebarTodoList: [] as Array<SideBarTodoListsType>,
      colors: [] as Array<ColorsType>,
      selectedTodoListColor: 1 as number | string,
      isLoaded: false as boolean,
      activeTodoList: JSON.parse(localStorage.getItem('activeTodoList') || '{}') as
        | SideBarTodoListsType
        | '',
    };

    let colors = [
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
    let action = actions.setTodoListColors(colors);
    let newState = sidebarReducer(state, action);
    expect(newState.colors.length).not.toBeGreaterThan(3);
    expect(newState.colors.length).toBe(3);
  });

  test(`addNewTodoList test`, () => {
    state = {
      sidebarTodoList: [
        {
          id: 1,
          name: 'Sales',
          colorId: 5,
        },
        {
          id: 2,
          name: 'Front-end',
          colorId: 4,
        },
        {
          id: 3,
          name: 'TV films and series?',
          colorId: 3,
        },
      ] as Array<SideBarTodoListsType>,
      colors: [] as Array<ColorsType>,
      selectedTodoListColor: 1 as number | string,
      isLoaded: false as boolean,
      activeTodoList: JSON.parse(localStorage.getItem('activeTodoList') || '{}') as
        | SideBarTodoListsType
        | '',
    };

    let newListItem = {
      id: 5,
      name: 'New Text',
      colorId: 7,
    };

    let action = actions.addNewTodoList(newListItem);
    let newState = sidebarReducer(state, action);
    expect(newState.sidebarTodoList.length).toBe(4);
    expect(newState.sidebarTodoList[3].name).toBe('New Text');
  });

  test(`deleteTodoListItem test`, () => {
    state = {
      sidebarTodoList: [
        {
          id: 1,
          name: 'Sales',
          colorId: 5,
        },
        {
          id: 2,
          name: 'Front-end',
          colorId: 4,
        },
        {
          id: 3,
          name: 'TV films and series?',
          colorId: 3,
        },
      ] as Array<SideBarTodoListsType>,
      colors: [] as Array<ColorsType>,
      selectedTodoListColor: 1 as number | string,
      isLoaded: false as boolean,
      activeTodoList: JSON.parse(localStorage.getItem('activeTodoList') || '{}') as
        | SideBarTodoListsType
        | '',
    };

    let action = actions.deleteTodoListItem(3);
    let newState = sidebarReducer(state, action);
    expect(newState.sidebarTodoList.length).toBe(2);
    expect(newState.sidebarTodoList[3]).toBeUndefined();
  });

  test(`changeTodoListItemName test`, () => {
    state = {
      sidebarTodoList: [
        {
          id: 1,
          name: 'Sales',
          colorId: 5,
        },
        {
          id: 2,
          name: 'Front-end',
          colorId: 4,
        },
        {
          id: 3,
          name: 'TV films and series?',
          colorId: 3,
        },
      ] as Array<SideBarTodoListsType>,
      colors: [] as Array<ColorsType>,
      selectedTodoListColor: 1 as number | string,
      isLoaded: false as boolean,
      activeTodoList: JSON.parse(localStorage.getItem('activeTodoList') || '{}') as
        | SideBarTodoListsType
        | '',
    };

    let action = actions.changeTodoListItemName(1, 'Chupackabra');
    let newState = sidebarReducer(state, action);
    expect(newState.sidebarTodoList[0].name).toBe('Chupackabra');
  });
});
