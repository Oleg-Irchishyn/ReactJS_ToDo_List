import React from 'react';
import styles from '../../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { SideBarTodoListsType } from '../../../redux/types/types';

const ActiveTaskList: React.FC<ownProps> = ({ activeTodoList }) => {
  const titleStyle = {
    color: activeTodoList && activeTodoList.color,
  };
  return (
    <div className={cn(styles.activetask)}>
      <h2 style={titleStyle} className={cn(styles.activetask__title)}>
        {activeTodoList && activeTodoList.name}
      </h2>
    </div>
  );
};

type ownProps = {
  activeTodoList: SideBarTodoListsType;
};

export default ActiveTaskList;
