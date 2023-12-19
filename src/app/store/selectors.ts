import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => [...state.todos].sort((a, b) => {
      if (a.isClosed && b.isClosed) {
        return a.toggleTime - b.toggleTime;
      } else if (!a.isClosed && b.isClosed) {
        return -1;
      } else if (a.isClosed && !b.isClosed) {
        return 1;
      }
      return 0;
    })
);
