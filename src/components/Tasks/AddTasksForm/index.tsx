import React from 'react';
import styles from '../../../styles/components/AddTasksForm.module.scss';
import taskSstyles from '../../../styles/components/Tasks.module.scss';
import cn from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getSelectedTodoListColor,
  getTodoListColors,
} from '../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../redux/store';
import { ColorBadges } from '../../';
import { ColorsType } from '../../../redux/types/types';
import { setNewTodoListItem } from '../../../redux/reducers/sidebar';
import { v4 as uuidv4 } from 'uuid';
import { FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import { createInput } from '../../common/FormControls';
import { maxLengthCreator, required } from '../../../redux/utils/validators';

export const AddTasksForm: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> =
  React.memo(({ colors, selectedTodoListColor, setNewTodoListItem }) => {
    const [visibleForm, setFormVisibility] = React.useState<boolean>(false);

    const showAddTaskFormPopup = () => {
      setFormVisibility(true);
    };

    const popupFormRef = React.useRef<HTMLDivElement>(null);

    const handleFormOutsideClick = React.useCallback((e: any) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(popupFormRef.current)) {
        setFormVisibility(false);
      }
    }, []);

    React.useEffect(() => {
      document.body.addEventListener('click', handleFormOutsideClick);
      return () => {
        document.body.removeEventListener('click', handleFormOutsideClick);
      };
    }, [handleFormOutsideClick]);

    const onSubmitForm = (values: AddNewTaskFormValuesType, dispatch: (T: FormAction) => void) => {
      const newTaskItem = {
        id: Number(uuidv4()),
        name: values.name,
        colorId: selectedTodoListColor,
      };

      const { id, name, colorId } = newTaskItem;
      setFormVisibility(false);
      setNewTodoListItem(id, name, colorId);
    };
    return (
      <div className={cn(taskSstyles.tasks__items_form_wrapper)} ref={popupFormRef}>
        <div
          data-testid="form-popup-btn"
          className={cn(taskSstyles.tasks__items_add_btn)}
          onClick={showAddTaskFormPopup}>
          {!visibleForm ? <b>+</b> : <b>-</b>} <span>Add list</span>
        </div>
        {visibleForm && (
          <div data-testid="add-task-form-popup" className={cn(styles.add_task_form)}>
            <div
              data-testid="popup-close-btn"
              className={cn(styles.add_task_form__close)}
              onClick={() => setFormVisibility(false)}></div>
            <ul className={cn(styles.add_task_form__colorbadges_wrapper)}>
              {colors.map((item) => {
                const { id } = item;
                //@ts-ignore
                return <ColorBadges key={id} item={item} />;
              })}
            </ul>
            <AddNewTaskFormRedux onSubmit={onSubmitForm} />
          </div>
        )}
      </div>
    );
  });

const maxLength20 = maxLengthCreator(20);

export const AddNewTaskForm: React.FC<InjectedFormProps<AddNewTaskFormValuesType>> = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={cn(styles.add_task_form__content)} onSubmit={handleSubmit}>
      {createInput<AddNewPostFormValuesTypeKeys>(uuidv4(), `Enter task's name`, 'name', 'text', [
        required,
        maxLength20,
      ])}
      <button data-testid="tasksForm-submit-btn">Submit</button>
    </form>
  );
};

const AddNewTaskFormRedux = reduxForm<AddNewTaskFormValuesType>({
  form: 'addNewTaskForm',
})(AddNewTaskForm);

export type AddNewTaskFormValuesType = {
  name: string;
};

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewTaskFormValuesType, string>;

const mapStateToProps = (state: AppStateType) => ({
  colors: getTodoListColors(state),
  selectedTodoListColor: getSelectedTodoListColor(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewTodoListItem: (id: string | number, name: string, colorId: string | number) => void;
};

type ownProps = {
  item: ColorsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewTodoListItem,
  }),
)(AddTasksForm);
