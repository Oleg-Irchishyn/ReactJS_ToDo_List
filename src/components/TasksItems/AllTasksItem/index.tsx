import React from 'react';
//@ts-ignore
import styles from '../../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { SideBarTodoListsType } from '../../../redux/types/types';
//@ts-ignore
import editImg from '../../../assets/images/edit.svg';
import { AddTodoListTaskForm } from '../../';
import { AppStateType } from '../../../redux/store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changeTodoListItemName, actions as sBactions } from '../../../redux/reducers/sidebar';
import {
  setNewTodoListTaskName,
  deleteTodoListTask,
  toggleTaskCompletion,
} from '../../../redux/reducers/tasks';
import { NavLink } from 'react-router-dom';

const AllTasksItem: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  listItem,
  setNewTodoListTaskName,
  deleteTodoListTask,
  changeTodoListItemName,
  toggleTaskCompletion,
  setActiveTodoList,
}) => {
  const titleStyle = {
    color: listItem && listItem.color,
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const filterActiveItemTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const taksLength = listItem && listItem.tasks && listItem.tasks.length > 0;

  const activeTaskColor = {
    color: listItem.color,
  };

  const filteredActiveItemTasks =
    listItem &&
    listItem.tasks &&
    listItem.tasks.filter((task) => {
      if (
        String(task.text).toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
        String(task.text).toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
      ) {
        return task;
      }
    });

  const onEditTaskName = (id: string | number, newVal: string | number) => {
    const newTaskValue = window.prompt(`Task's Name`, (newVal = String(newVal)));
    if (newTaskValue) {
      setNewTodoListTaskName(id, newTaskValue);
    }
  };

  const onDeleteTaskItem = (id: string | number) => {
    if (window.confirm(`Do you want to remove this task?`)) {
      deleteTodoListTask(id);
    } else return false;
  };

  const onChangeActiveListName = (id: string | number, name: string) => {
    const newTodoListName = window.prompt(`List's Name`, (name = String(name)));
    if (newTodoListName) {
      changeTodoListItemName(id, newTodoListName);
    }
  };

  return (
    <div className={cn(styles.activetask, styles.all)}>
      <div
        className={cn(styles.activetask__title_wrapper)}
        onClick={() => {
          setActiveTodoList(listItem);
        }}>
        <NavLink title={listItem.name} rel="nofollow" to={`/lists/${listItem.id}`}>
          <h2 style={titleStyle} className={cn(styles.activetask__title)}>
            <span>{listItem && listItem.name}</span>
            <i onClick={() => onChangeActiveListName(listItem.id, listItem.name)}>
              <img src={editImg} alt={editImg} />
            </i>
          </h2>
        </NavLink>
      </div>
      {taksLength ? (
        <div className={cn(styles.activetask__tasks)}>
          <div className={cn(styles.tasks__search_field_wrapper)}>
            <input
              className={cn(styles.tasks__search_field)}
              placeholder="Search tasks..."
              type="text"
              value={searchQuery}
              onChange={(e) => filterActiveItemTasks(e)}
            />
            <i className="fa fa-search"></i>
          </div>
          {filteredActiveItemTasks &&
            filteredActiveItemTasks.map((obj) => {
              return (
                <div key={obj.id} className={cn(styles.task_item)}>
                  <i
                    className={cn(styles.item_edit)}
                    onClick={() => onEditTaskName(obj.id, obj.text)}>
                    <img src={editImg} alt={editImg} />
                  </i>
                  <i
                    className={cn(styles.item_delete)}
                    onClick={() => onDeleteTaskItem(obj.id)}></i>
                  <input
                    id={`task - ${obj.id}`}
                    type="checkbox"
                    checked={obj.completed}
                    onChange={() => toggleTaskCompletion(obj.id, obj.listId, !obj.completed)}
                  />
                  <label htmlFor={`task - ${obj.id}`}>{obj.text}</label>
                </div>
              );
            })}
        </div>
      ) : (
        <div style={activeTaskColor} className={cn(styles.activetask__tasks_empty)}>
          <span>Ooops, no tasks</span>
          <b>:(</b>
          <div>You may add one to make a list!</div>
        </div>
      )}
      {
        //@ts-ignore
        <AddTodoListTaskForm activeListId={listItem} />
      }
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewTodoListTaskName: (id: string | number, newVal: string | number) => void;
  deleteTodoListTask: (id: string | number) => void;
  changeTodoListItemName: (id: string | number, name: string) => void;
  toggleTaskCompletion: (
    id: string | number,
    listId: string | number | null,
    completed: boolean,
  ) => void;
  setActiveTodoList: (obj: SideBarTodoListsType) => void;
};

type ownProps = {
  listItem: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewTodoListTaskName,
    deleteTodoListTask,
    changeTodoListItemName,
    toggleTaskCompletion,
    setActiveTodoList: sBactions.setActiveTodoList,
  }),
)(AllTasksItem);
