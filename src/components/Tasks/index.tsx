import React from 'react';
import styles from '../../styles/components/Tasks.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getSidebarTodoList } from '../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../redux/store';
import { SingleTask, AddTasksForm } from '../';
import { SideBarTodoListsType } from '../../redux/types/types';

const Tasks: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ sidebarTodoList }) => {
    return (
      <div className={cn(styles.tasks)}>
        <NavLink className={cn(styles.tasks__items_all)} to="/" title="All tasks" rel="nofollow">
          All Tasks
        </NavLink>
        {sidebarTodoList &&
          sidebarTodoList.map((elem) => {
            //@ts-ignore
            return <SingleTask key={elem.id} elem={elem} />;
          })}
        <AddTasksForm />
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
  elem: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
)(Tasks);
