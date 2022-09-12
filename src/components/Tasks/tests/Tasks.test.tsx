import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tasks from '..';
import TasksItems from '../../TasksItems';
import { renderTestApp } from '../../../helpers/renderTestApp';

describe('Tasks component test', () => {
  test(`TaskItem component renders after click on 'all tasks' link`, () => {
    render(
      renderTestApp([<Tasks />, <TasksItems />], {
        initialRoute: '/',
      }),
    );
    const link = screen.getByTestId('all-tasks-link');
    const tasksItem = screen.getByTestId('tasks-items-component');
    userEvent.click(link);
    expect(tasksItem).toBeInTheDocument();
  });
});
