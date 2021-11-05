import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getSelectedTodoListColor } from '../../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../../redux/store';
import { actions } from '../../../../redux/reducers/sidebar';
import { ColorsType } from '../../../../redux/types/types';
import styles from '../../../../styles/components/AddTasksForm.module.scss';
import cn from 'classnames';

const ColorBadges: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ selectedTodoListColor, setSelectedTodoListColor, item }) => {
    const { id, name, hex } = item;
    const colorStyle = {
      backgroundColor: hex,
    };

    const handleSetSelectedTodoListColor = (id: number | string) => {
      setSelectedTodoListColor(id);
    };
    return (
      <li
        style={colorStyle}
        onClick={() => handleSetSelectedTodoListColor(id)}
        className={cn({
          [styles.active]: id === selectedTodoListColor ? true : false,
        })}></li>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  selectedTodoListColor: getSelectedTodoListColor(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setSelectedTodoListColor: (val: number | string) => void;
};

type ownProps = {
  item: ColorsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setSelectedTodoListColor: actions.setSelectedTodoListColor,
  }),
)(ColorBadges);
