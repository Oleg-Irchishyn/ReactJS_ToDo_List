import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from '../../styles/components/TasksItems.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getActiveTodoList } from '../../redux/selectors/sidebarSelectors';

const TasksItems: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ activeTodoList }) => {
    return <div></div>;
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
