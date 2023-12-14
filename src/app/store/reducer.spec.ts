import { loadTodosSuccess, updateTodo } from './actions';
import * as fromReducer from './reducer';
import { todosReducer, TodosState } from './reducer';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = { type: 'Unknown' };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: TodosState = { todos: [{ title: 'aTitle', isClosed: false }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('updateTodo action', () => {
    it('should update todo state to closed', () => {
      // Given
      const initialState: TodosState = {
        todos: [
          { title: 'todo1', isClosed: true },
          { title: 'todo2', isClosed: false },
        ],
      };
      const updateTodoAction = updateTodo({ todo: { title: 'todo2', isClosed: true } });
      // When
      const result = todosReducer(initialState, updateTodoAction);
      // Then
      expect(result.todos[0].isClosed).toBeTrue();
      expect(result.todos[1].isClosed).toBeTrue();
    });
  });
});
