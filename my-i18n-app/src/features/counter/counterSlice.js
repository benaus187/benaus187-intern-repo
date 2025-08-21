import { createSlice } from '@reduxjs/toolkit'

// remove interface/type stuff – just a plain object
const initialState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    addBy: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, reset, addBy } = counterSlice.actions
export default counterSlice.reducer
