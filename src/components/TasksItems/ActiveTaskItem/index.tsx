import React from 'react';
import styles from '../../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { SideBarTodoListsType } from '../../../redux/types/types';
import editImg from '../../../assets/images/edit.svg';
import { AddTodoListTaskForm } from '../../';
import { AppStateType } from '../../../redux/store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setNewTodoListTaskName } from '../../../redux/reducers/tasks';
import { getActiveTodoList } from '../../../redux/selectors/sidebarSelectors';

const ActiveTaskList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  activeTodoList,
}) => {
  const titleStyle = {
    color: activeTodoList && activeTodoList.color,
  };

  const onEditTaskName = (id: string | number, newVal: string | number) => {
    const newTaskValue = window.prompt(`Task's Name`, (newVal = String(newVal)));
    if (newTaskValue) {
      setNewTodoListTaskName(id, newTaskValue);
    }
  };

  return (
    <div className={cn(styles.activetask)}>
      <h2 style={titleStyle} className={cn(styles.activetask__title)}>
        <span>{activeTodoList && activeTodoList.name}</span>
        <i>
          <img src={editImg} alt={editImg} />
        </i>
      </h2>
      <div className={cn(styles.activetask__tasks)}>
        {activeTodoList &&
          activeTodoList.tasks &&
          activeTodoList.tasks.map((obj) => {
            return (
              <div key={obj.id} className={cn(styles.task_item)}>
                <i
                  className={cn(styles.item_edit)}
                  onClick={() => onEditTaskName(obj.id, obj.text)}>
                  <img src={editImg} alt={editImg} />
                </i>
                <i className={cn(styles.item_delete)}></i>
                <input
                  id={`task - ${obj.id}`}
                  type="checkbox"
                  checked={obj.completed}
                  onChange={() => console.log('yo')}
                />
                <label htmlFor={`task - ${obj.id}`}>{obj.text}</label>
              </div>
            );
          })}
      </div>
      {
        //@ts-ignore
        <AddTodoListTaskForm activeListId={activeTodoList} />
      }
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewTodoListTaskName: (id: string | number, newVal: string | number) => void;
};

type ownProps = {
  activeTodoList: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewTodoListTaskName,
  }),
)(ActiveTaskList);
