import React from 'react';
import styles from './styles/components/App.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Preloader } from './components/common';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/app';
import { getInitialization } from './redux/selectors/appSelectors';
import cn from 'classnames';
import { Tasks, TasksItems } from './components';
import { getActiveTodoList, getIsLoaded } from './redux/selectors/sidebarSelectors';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

/* React Lazy example
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedProfile = withSuspense(ProfileContainer);

/* React Routes example
/* <Route path="*" render={() => <div>404 NOT FOUND</div>} /> */
/*<Route path="/profile/:userId?" render={() => <SuspendedProfile />} />*/
{
  /* <Route path="/lists/:id" render={() => <TasksList activeListItem={activeListItem} />} /> */
}

const App: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ initializeApp, initialized, isLoaded, activeTodoList }) => {
    React.useEffect(() => {
      initializeApp();
    }, []);

    React.useEffect(() => {
      localStorage.setItem('activeTodoList', JSON.stringify(activeTodoList));
    });

    if (!initialized || !isLoaded) {
      return <Preloader />;
    }

    return (
      <div className={cn(styles.main)}>
        <div className={cn('container')}>
          <div className={cn(styles.todo_content)}>
            <Tasks />
            <TasksItems />
          </div>
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  initialized: getInitialization(state),
  isLoaded: getIsLoaded(state),
  activeTodoList: getActiveTodoList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};

type ownProps = {
  history: RouteComponentProps['history'];
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    initializeApp,
  }),
  withRouter,
)(App);
