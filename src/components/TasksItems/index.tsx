import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from '../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getSidebarTodoList } from '../../redux/selectors/sidebarSelectors';
import { ActiveTaskList, AllTasksItem } from '../';
import { SideBarTodoListsType } from '../../redux/types/types';

const TasksItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ sidebarTodoList }) => {
    return (
      <div className={cn(styles.taskItems)}>
        <Route exact path="/lists/:id" render={() => <ActiveTaskList />} />
        {sidebarTodoList.map((listItem) => {
          return (
            <Route
              exact
              path="/"
              //@ts-ignore
              render={() => <AllTasksItem key={listItem.id} listItem={listItem} />}
            />
          );
        })}
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  sidebarTodoList: getSidebarTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

type ownProps = {
  listItem: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
  withRouter,
)(TasksItems);
