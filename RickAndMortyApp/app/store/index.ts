import { configureStore, Middleware } from '@reduxjs/toolkit'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middlewares/logger'
// ...

const middlewares: Middleware[] = [thunk];
const enhancers: any[] = [];

middlewares.push(loggerMiddleware);
enhancers.push(monitorReducersEnhancer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  enhancers: enhancers
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch