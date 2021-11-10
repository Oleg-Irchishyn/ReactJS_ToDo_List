import React from 'react';
import { SideBarTodoListsType } from '../../../redux/types/types';
import styles from '../../../styles/components/Tasks.module.scss';
import cn from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/store';
import { actions, deleteSidebarTodoList } from '../../../redux/reducers/sidebar';
import { getActiveTodoList } from '../../../redux/selectors/sidebarSelectors';
import { RouteComponentProps } from 'react-router-dom';

const SingleTask: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ elem, deleteSidebarTodoList, setActiveTodoList, activeTodoList, history }) => {
    const { id, name, color, tasks } = elem;
    const colorStyle = {
      backgroundColor: color,
    };

    const tasksAmountColor = {
      color: color,
    };

    const handleDeleTodoList = (id: string | number) => {
      if (window.confirm(`Do you want to remove this list?`)) {
        deleteSidebarTodoList(id);
        history.push(`/`);
        localStorage.clear();
      } else return false;
    };
    return (
      <div
        className={cn(styles.tasks__item_wrapper, {
          [styles.active]: activeTodoList && activeTodoList.id === id,
        })}
        onClick={() => setActiveTodoList(elem)}>
        <NavLink className={cn(styles.tasks__item)} to={`/lists/${id}`} title={name} rel="nofollow">
          <i style={colorStyle}></i>
          <p>{name}</p>
          {tasks && tasks.length > 0 ? (
            <span
              style={tasksAmountColor}
              className={cn(styles.tasks__item_amount)}>{`(${tasks.length})`}</span>
          ) : null}
        </NavLink>
        <div className={cn(styles.delete_icon)} onClick={() => handleDeleTodoList(id)}></div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  deleteSidebarTodoList: (id: string | number) => void;
  setActiveTodoList: (obj: SideBarTodoListsType) => void;
};

type ownProps = {
  elem: SideBarTodoListsType;
  history: RouteComponentProps['history'];
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteSidebarTodoList,
    setActiveTodoList: actions.setActiveTodoList,
  }),
  withRouter,
)(SingleTask);
