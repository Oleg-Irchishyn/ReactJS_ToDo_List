import React from 'react';
import styles from '../../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { SideBarTodoListsType } from '../../../redux/types/types';
import editImg from '../../../assets/images/edit.svg';

const ActiveTaskList: React.FC<ownProps> = ({ activeTodoList }) => {
  const titleStyle = {
    color: activeTodoList && activeTodoList.color,
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
                <i className={cn(styles.item_edit)}>
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
    </div>
  );
};

type ownProps = {
  activeTodoList: SideBarTodoListsType;
};

export default ActiveTaskList;
