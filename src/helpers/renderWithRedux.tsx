import store from '../redux/store';
import React from 'react';
import { Provider } from 'react-redux';

export const renderWithRedux = (components: Array<React.ReactElement>) => {
  return (
    <Provider store={store}>
      {components.map((singleComponent, index) => {
        return <React.Fragment key={index}>{singleComponent}</React.Fragment>;
      })}{' '}
    </Provider>
  );
};
