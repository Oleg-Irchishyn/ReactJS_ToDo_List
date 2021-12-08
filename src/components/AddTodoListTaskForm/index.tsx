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
import { getAllSidebarTodoList } from '../../redux/reducers/sidebar';
import { SideBarTodoListsType } from '../../redux/types/types';
import { actions as sbActions } from '../../redux/reducers/sidebar';
import { RouteComponentProps, withRouter } from 'react-router';

const AddTodoListTaskForm: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> =
  React.memo(
    ({
      setNewTodoListTaskSuccess,
      getAllSidebarTodoList,
      setActiveTodoList,
      activeListId,
      history,
    }) => {
      const [visibleForm, setFormVisibility] = React.useState<boolean>(false);

      const showAddTaskFormPopup = () => {
        setFormVisibility(true);
      };

      const onCancelSubmit = () => {
        setFormVisibility(false);
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
        getAllSidebarTodoList();
        history.push(`/`);
        localStorage.clear();
        setActiveTodoList('');
      };
      return (
        <div ref={dropdownFormRef} className={cn(styles.form_wrapper)}>
          <div className={cn(styles.show_form_btn)} onClick={showAddTaskFormPopup}>
            {!visibleForm ? <b>+</b> : <b>-</b>} <span>Add New Task</span>
          </div>
          {visibleForm && (
            <div className={cn(styles.add_todo_list_task_form)}>
              <AddTodoListTaskFormFormRedux
                onCancelSubmit={onCancelSubmit}
                onSubmit={onSubmitForm}
              />
            </div>
          )}
        </div>
      );
    },
  );

const maxLength20 = maxLengthCreator(20);

const AddNewTaskForm: React.FC<
  InjectedFormProps<AddTodoListTaskFormValuesType, ownFormProps> & ownFormProps
> = (props) => {
  const { handleSubmit, onCancelSubmit } = props;
  return (
    <form className={cn(styles.add_todo_list_task_form__content)} onSubmit={handleSubmit}>
      {createInput<AddTodoListTaskFormValuesTypeKeys>(
        uuidv4(),
        `Enter task's name`,
        'text',
        'text',
        [required, maxLength20],
      )}
      <div className={styles.content__buttons}>
        <button>Submit</button>
        <div className={styles.button_close} onClick={onCancelSubmit}>
          Cancel
        </div>
      </div>
    </form>
  );
};

type ownFormProps = {
  onCancelSubmit: () => void;
};

const AddTodoListTaskFormFormRedux = reduxForm<AddTodoListTaskFormValuesType, ownFormProps>({
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
  getAllSidebarTodoList: () => void;
  setActiveTodoList: (obj: SideBarTodoListsType | '') => void;
};

type ownProps = {
  activeListId: SideBarTodoListsType;
  history: RouteComponentProps['history'];
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewTodoListTaskSuccess,
    getAllSidebarTodoList,
    setActiveTodoList: sbActions.setActiveTodoList,
  }),
  withRouter,
)(AddTodoListTaskForm);
