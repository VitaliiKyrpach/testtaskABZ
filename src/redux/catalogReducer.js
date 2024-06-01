import { usersReducer } from './catalogSlice';
import { combineReducers } from '@reduxjs/toolkit';
export const reducer = combineReducers({
  users: usersReducer,
});