import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../../../../helpers/renderWithRedux';
import AddTasksForm from '..';

describe('AddTasks Component test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`form popup will be shown after click`, () => {
    render(renderWithRedux([<AddTasksForm />]));
    const popupBtn = screen.getByTestId('form-popup-btn');
    expect(screen.queryByTestId('add-task-form-popup')).toBeNull();
    userEvent.click(popupBtn);
    expect(screen.queryByTestId('add-task-form-popup')).toBeInTheDocument();
    const closeBtn = screen.getByTestId('popup-close-btn');
    userEvent.click(closeBtn);
    expect(screen.queryByTestId('add-task-form-popup')).toBeNull();
  });

  test(`check if form's submit and text inputs are working`, () => {
    render(renderWithRedux([<AddTasksForm />]));
    const popupBtn = screen.getByTestId('form-popup-btn');
    expect(screen.queryByTestId('add-task-form-popup')).toBeNull();
    userEvent.click(popupBtn);
    expect(screen.queryByTestId('add-task-form-popup')).toBeInTheDocument();
    const submitBtn = screen.getByTestId('tasksForm-submit-btn');
    const input = screen.getByPlaceholderText(/Enter task's name/i);
    userEvent.type(input, '123123');
    expect(input).toHaveDisplayValue('123123');
    userEvent.click(submitBtn);
    expect(screen.queryByTestId('add-task-form-popup')).toBeNull();
  });
});
