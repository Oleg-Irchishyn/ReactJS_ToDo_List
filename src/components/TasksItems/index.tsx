import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from '../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getSidebarTodoList } from '../../redux/selectors/sidebarSelectors';
import { SideBarTodoListsType } from '../../redux/types/types';
import { withSuspense } from '../../hoc/WithSuspense';
import { Scrollbars } from 'react-custom-scrollbars';

const ActiveTaskList = React.lazy(() => import('../TasksItems/ActiveTaskItem/'));
const AllTasksItem = React.lazy(() => import('../TasksItems/AllTasksItem/'));

const SuspendedActiveTaskList = withSuspense(ActiveTaskList);
const SuspendedAllTasksItem = withSuspense(AllTasksItem);

const TasksItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ sidebarTodoList, shrinkedSidebar }) => {
    return (
      <div
        className={cn(styles.taskItems, {
          [styles.hidden]: shrinkedSidebar,
        })}>
        <Scrollbars
          style={{
            width: '100%',
            height: '100%',
          }}
          thumbSize={30}
          renderThumbVertical={(props) => <div {...props} className="thumb_vertical" />}
          renderThumbHorizontal={(props) => <div {...props} className="thumb_horizontal" />}>
          <Route exact path="/lists/:id" render={() => <SuspendedActiveTaskList />} />
          {sidebarTodoList.map((listItem) => {
            return (
              <Route
                exact
                path="/"
                //@ts-ignore
                render={() => <SuspendedAllTasksItem key={listItem.id} listItem={listItem} />}
              />
            );
          })}
        </Scrollbars>
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
  handleToggleShrinkedSidebar: (val: boolean) => void;
  shrinkedSidebar: boolean;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
  withRouter,
)(TasksItems);
