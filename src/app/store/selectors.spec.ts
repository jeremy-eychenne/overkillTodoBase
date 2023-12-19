import { State } from './reducer';
import { selectTodos } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { id: 1, title: 'todo1Title', isClosed: true, toggleTime: 1000 },
      { id: 2, title: 'todo2Title', isClosed: false, toggleTime: 10 },
      { id: 3, title: 'todo3Title', isClosed: true, toggleTime: 10 },
      { id: 4, title: 'todo4Title', isClosed: false, toggleTime: 0 },
    ]
  };
  const sortedState: State = {
    todos: [
      { id: 2, title: 'todo2Title', isClosed: false, toggleTime: 10 },
      { id: 4, title: 'todo4Title', isClosed: false, toggleTime: 0 },
      { id: 3, title: 'todo3Title', isClosed: true, toggleTime: 10 },
      { id: 1, title: 'todo1Title', isClosed: true, toggleTime: 1000 },
    ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(sortedState.todos);
  });
});
