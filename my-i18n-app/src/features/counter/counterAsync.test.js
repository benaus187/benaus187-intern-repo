import reducer, { fetchByAmount } from './counterSlice';

describe('counter async reducer', () => {
  it('handles pending and fulfilled of fetchByAmount', () => {
    let state = { value: 0, status: 'idle', error: null };

    // pending
    state = reducer(state, { type: fetchByAmount.pending.type });
    expect(state.status).toBe('loading');

    // fulfilled with payload 7
    state = reducer(state, { type: fetchByAmount.fulfilled.type, payload: 7 });
    expect(state.status).toBe('succeeded');
    expect(state.value).toBe(7);
  });

  it('handles rejected of fetchByAmount', () => {
    let state = { value: 0, status: 'idle', error: null };
    state = reducer(state, { type: fetchByAmount.rejected.type, error: { message: 'nope' } });
    expect(state.status).toBe('failed');
    expect(state.error).toBe('nope');
  });
});
