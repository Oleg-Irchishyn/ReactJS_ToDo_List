import { AppStateType } from '../store';

export const getInitialization = (state: AppStateType) => {
  return state.app.initialized;
};
