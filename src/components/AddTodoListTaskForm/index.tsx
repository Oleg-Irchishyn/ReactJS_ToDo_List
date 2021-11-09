import React from 'react';
import styles from '../../styles/components/AddTodoListTaskForm.module.scss';
import cn from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import { createInput } from '../common/FormControls';
import { maxLengthCreator, required } from '../../redux/utils/validators';
import { setNewTodoListTaskSuccess } from '../../redux/reducers/tasks';
import { SideBarTodoListsType } from '../../redux/types/types';

const AddTodoListTaskForm: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> =
  React.memo(({ setNewTodoListTaskSuccess, activeListId }) => {
    const [visibleForm, setFormVisibility] = React.useState<boolean>(false);

    const showAddTaskFormPopup = () => {
      setFormVisibility(true);
    };

    const dropdownFormRef = React.useRef<HTMLDivElement>(null);

    const handleTaskFormOutsideClick = React.useCallback((e: any) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(dropdownFormRef.current)) {
        setFormVisibility(false);
      }
    }, []);

    React.useEffect(() => {
      document.body.addEventListener('click', handleTaskFormOutsideClick);
      return () => {
        document.body.removeEventListener('click', handleTaskFormOutsideClick);
      };
    }, [handleTaskFormOutsideClick]);

    const onSubmitForm = (
      values: AddTodoListTaskFormValuesType,
      dispatch: (T: FormAction) => void,
    ) => {
      const newTaskItem = {
        id: uuidv4(),
        listId: activeListId && activeListId?.id,
        text: values.text,
        completed: false,
      };

      const { id, listId, text, completed } = newTaskItem;
      setFormVisibility(false);
      setNewTodoListTaskSuccess(id, listId, text, completed);
    };
    return (
      <div ref={dropdownFormRef}>
        <div className={cn(styles.show_form_btn)} onClick={showAddTaskFormPopup}>
          {!visibleForm ? <b>+</b> : <b>-</b>} <span>Add New Task</span>
        </div>
        {visibleForm && (
          <div className={cn(styles.add_todo_list_task_form)}>
            <div
              className={cn(styles.add_todo_list_task_form__close)}
              onClick={() => setFormVisibility(false)}></div>
            <AddTodoListTaskFormFormRedux onSubmit={onSubmitForm} />
          </div>
        )}
      </div>
    );
  });

const maxLength20 = maxLengthCreator(20);

const AddNewTaskForm: React.FC<InjectedFormProps<AddTodoListTaskFormValuesType>> = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={cn(styles.add_todo_list_task_form_content)} onSubmit={handleSubmit}>
      {createInput<AddTodoListTaskFormValuesTypeKeys>(
        uuidv4(),
        `Enter task's name`,
        'text',
        'text',
        [required, maxLength20],
      )}
      <div className={styles.content__buttons}>
        <button>Submit</button>
        <div>Cancel</div>
      </div>
    </form>
  );
};

const AddTodoListTaskFormFormRedux = reduxForm<AddTodoListTaskFormValuesType>({
  form: 'addTodoListTaskForm',
})(AddNewTaskForm);

export type AddTodoListTaskFormValuesType = {
  text: string;
};

type AddTodoListTaskFormValuesTypeKeys = Extract<keyof AddTodoListTaskFormValuesType, string>;

const mapStateToProps = (state: AppStateType) => ({});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  setNewTodoListTaskSuccess: (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ) => void;
};

type ownProps = {
  activeListId: SideBarTodoListsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewTodoListTaskSuccess,
  }),
)(AddTodoListTaskForm);
