import React from 'react';
//@ts-ignore
import styles from '../../styles/components/Tasks.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getActiveTodoList, getSidebarTodoList } from '../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../redux/store';
import { SingleTask, AddTasksForm } from '../';
import { SideBarTodoListsType } from '../../redux/types/types';
import { actions } from '../../redux/reducers/sidebar';

const Tasks: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({
    sidebarTodoList,
    setActiveTodoList,
    activeTodoList,
    handleToggleShrinkedSidebar,
    shrinkedSidebar,
  }) => {
    return (
      <div
        className={cn(styles.tasks, {
          [styles.large]: shrinkedSidebar,
          [styles.small]: !shrinkedSidebar,
        })}>
        <div
          className={cn(styles.tasks__item_wrapper, {
            [styles.active]: !activeTodoList,
          })}
          onClick={() => setActiveTodoList('')}>
          <NavLink className={cn(styles.tasks__items_all)} to="/" title="All tasks" rel="nofollow">
            All Tasks
          </NavLink>
        </div>
        {sidebarTodoList &&
          sidebarTodoList.map((elem) => {
            //@ts-ignore
            return <SingleTask key={elem.id} elem={elem} />;
          })}
        <AddTasksForm />

        <div
          className={cn(styles.tasks__icon)}
          onClick={() => handleToggleShrinkedSidebar(!shrinkedSidebar)}>
          {shrinkedSidebar ? (
            <i className="fa fa-hand-o-left"></i>
          ) : (
            <i className="fa fa-hand-o-right"></i>
          )}
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  sidebarTodoList: getSidebarTodoList(state),
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setActiveTodoList: (obj: SideBarTodoListsType | '') => void;
};
type ownProps = {
  elem: SideBarTodoListsType;
  handleToggleShrinkedSidebar: (val: boolean) => void;
  shrinkedSidebar: boolean;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setActiveTodoList: actions.setActiveTodoList,
  }),
)(Tasks);
