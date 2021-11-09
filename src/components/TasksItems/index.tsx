import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from '../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getActiveTodoList } from '../../redux/selectors/sidebarSelectors';
import { ActiveTaskList } from '../';

const TasksItems: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ activeTodoList }) => {
    return (
      <div className={cn(styles.taskItems)}>
        <Route path="/lists/:id" render={() => <ActiveTaskList />} />
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {}),
  withRouter,
)(TasksItems);
