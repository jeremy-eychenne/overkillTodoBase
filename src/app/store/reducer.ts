import { createReducer, on } from '@ngrx/store';

import { loadTodosSuccess, updateTodo } from './actions';
import { Todo } from '../models/todo';

export const featureKey = 'todosStore';

export interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: [],
};

function updateTodoInArray(todos: ReadonlyArray<Todo>, updatedTodo: Todo): Todo[] {
  return todos.map((todo) => (todo.title === updatedTodo.title ? { ...todo, ...updatedTodo } : todo));
}
export const todosReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(updateTodo, (state, { todo }) => ({
    ...state,
    todos: updateTodoInArray(state.todos, todo),
  }))
);
