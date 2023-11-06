import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');
export const updateTodo = createAction(
  '[Todos] Update todos',
  props<{todo: Todo}>()
);

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');
