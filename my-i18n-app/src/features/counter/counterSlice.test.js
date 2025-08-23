import reducer, { increment, decrement, addBy, reset } from './counterSlice';

describe('counter reducer', () => {
  it('should return the initial state when state is undefined', () => {
    const next = reducer(undefined, { type: '@@INIT' });
    expect(next).toEqual({ value: 0, status: 'idle', error: null });
  });

  it('handles increment/decrement/addBy/reset', () => {
    let state = { value: 0, status: 'idle', error: null };

    state = reducer(state, increment());
    expect(state.value).toBe(1);

    state = reducer(state, addBy(5));
    expect(state.value).toBe(6);

    state = reducer(state, decrement());
    expect(state.value).toBe(5);

    state = reducer(state, reset());
    expect(state.value).toBe(0);
  });
});
