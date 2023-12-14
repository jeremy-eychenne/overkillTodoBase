import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey, TodosState } from './reducer';

export const getState = createFeatureSelector<TodosState>(featureKey);

export const selectTodos = createSelector(getState, (state) => state.todos);

export const selectOpenTodos = createSelector(selectTodos, (todos) => todos.filter((todo) => !todo.isClosed));

export const selectClosedTodos = createSelector(selectTodos, (todos) => todos.filter((todo) => todo.isClosed));

export const todoSelectors = {
  selectTodos,
  selectClosedTodos,
  selectOpenTodos,
};
