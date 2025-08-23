import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- Async example (pretend API) ---
export const fetchByAmount = createAsyncThunk(
  'counter/fetchByAmount',
  async (amount) => {
    // simulate latency
    await new Promise((r) => setTimeout(r, 50));
    // in real life you might do: const res = await fetch('/api'); return await res.json()
    return Number(amount);
  }
);

const initialState = { value: 0, status: 'idle', error: null };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    addBy: (state, action) => { state.value += action.payload; },
    reset: (state) => { state.value = 0; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByAmount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchByAmount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value += action.payload;
      })
      .addCase(fetchByAmount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'failed';
      });
  },
});

export const { increment, decrement, addBy, reset } = counterSlice.actions;
export default counterSlice.reducer;
