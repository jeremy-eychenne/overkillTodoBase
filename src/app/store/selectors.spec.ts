import { TodosState } from './reducer';
import { selectClosedTodos, selectOpenTodos, selectTodos } from './selectors';

describe('Selectors', () => {
  const initialState: TodosState = {
    todos: [
      { title: 'todo1Title', isClosed: true },
      { title: 'todo2Title', isClosed: false },
    ],
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select open todos', () => {
    const result = selectOpenTodos.projector(initialState.todos);
    expect(result).toHaveSize(1);
  });

  it('should select closed todos', () => {
    const result = selectClosedTodos.projector(initialState.todos);
    expect(result).toHaveSize(1);
  });
});
