import store from '../redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const renderTestApp = (components: Array<React.ReactElement | null>, options?: any) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.initialRoute]}>
        {components.map((elem, index) => (
          <React.Fragment key={index}>{elem}</React.Fragment>
        ))}
      </MemoryRouter>
    </Provider>
  );
};
