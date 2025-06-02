import { sortTodos } from '../todosSlice';

describe('sortTodos()', () => {
  it('sorts todos with incomplete ones first', () => {
    const input = [
      { text: 'first incomplete todo', done: false },
      { text: 'first complete todo', done: true },
      { text: 'second complete todo', done: true },
      { text: 'second incomplete todo', done: false },
    ];

    const expected = [
      { text: 'first incomplete todo', done: false },
      { text: 'second incomplete todo', done: false },
      { text: 'first complete todo', done: true },
      { text: 'second complete todo', done: true },
    ];

    sortTodos(input);

    expect(input).toEqual(expected);
  });
});
