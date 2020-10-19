import { createDataContext } from './create-data-context';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(reducer, {}, {});
