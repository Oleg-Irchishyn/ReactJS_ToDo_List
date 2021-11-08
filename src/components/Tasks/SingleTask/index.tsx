import React from 'react';
import { SideBarTodoListsType } from '../../../redux/types/types';
import styles from '../../../styles/components/Tasks.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/store';
import { actions, deleteSidebarTodoList } from '../../../redux/reducers/sidebar';

const SingleTask: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ elem, deleteSidebarTodoList, setActiveTodoList }) => {
    const { id, name, color } = elem;
    const colorStyle = {
      backgroundColor: color,
    };

    const handleDeleTodoList = (id: string | number) => {
      if (window.confirm(`Do you want to remove this list?`)) {
        deleteSidebarTodoList(id);
      } else return false;
    };
    return (
      <div className={cn(styles.tasks__item_wrapper)} onClick={() => setActiveTodoList(elem)}>
        <NavLink className={cn(styles.tasks__item)} to={`/lists/${id}`} title={name} rel="nofollow">
          <i style={colorStyle}></i>
          <p>{name}</p>
        </NavLink>
        <div className={cn(styles.delete_icon)} onClick={() => handleDeleTodoList(id)}></div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  deleteSidebarTodoList: (id: string | number) => void;
  setActiveTodoList: (obj: SideBarTodoListsType) => void;
};

type ownProps = {
  elem: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteSidebarTodoList,
    setActiveTodoList: actions.setActiveTodoList,
  }),
)(SingleTask);
