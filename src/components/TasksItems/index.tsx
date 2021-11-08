import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from '../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getActiveTodoList } from '../../redux/selectors/sidebarSelectors';
import { SideBarTodoListsType } from '../../redux/types/types';

const TasksItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ activeTodoList }) => {
    const titleStyle = {
      color: activeTodoList && activeTodoList.color,
    };

    return (
      <div className={cn(styles.taskItems)}>
        <div className={cn(styles.activetask)}>
          <h2 style={titleStyle} className={cn(styles.activetask__title)}>
            {activeTodoList && activeTodoList.name}
          </h2>
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

type ownProps = {
  activeTodoList: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
  withRouter,
)(TasksItems);
