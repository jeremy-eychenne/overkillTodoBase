import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccess, toggleTodo } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false, toggleTime: 0 }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('toggleTodo action', () => {
    const mockedDate = new Date('2010-12-25T10:59:00.000Z');
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(mockedDate);
    });

    it('should toggle isClosed property and set toggleTime value to the corresponding todo', () => {
      const initialState: State = {
        todos: [
          { id: 1, title: 'aTitle', isClosed: false, toggleTime: 0 },
          { id: 2, title: 'aTitle2', isClosed: true, toggleTime: 1000 },
        ]
      };
      const newState: State = {
        todos: [
          { id: 1, title: 'aTitle', isClosed: true, toggleTime: mockedDate.getTime() },
          { id: 2, title: 'aTitle2', isClosed: true, toggleTime: 1000 },
        ]
      };
      const action = toggleTodo({
        todo: newState.todos[0],
      });
      const state = fromReducer.todosReducer(initialState, action);
      expect(state).not.toBe(initialState);
      expect(state).toEqual(newState);
    });
  });

});
