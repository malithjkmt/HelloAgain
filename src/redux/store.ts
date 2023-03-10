import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import rewardsSlice from './rewards/rewards.slice';

const assembleMiddleware = () => {
  console.log('Assembling Redux middleware...');

  const middleware = [];

  /* ------------- ReduxThunk Middleware ------------- */
  middleware.push(thunkMiddleware);

  if (__DEV__) {
    /* ------------- Logger Middleware ------------- */
    // Note: logger must be the last middleware in chain,
    // otherwise it will log thunk and promise, not actual actions.
    const createDebugger = require('redux-flipper').default;
    const logger = createDebugger();

    middleware.push(logger);
  } else {
    // Remove console logs
    function noop() { }
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }

  return middleware;
};

export const store = configureStore({
  reducer: {
    rewards: rewardsSlice,
  },
  middleware: assembleMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
