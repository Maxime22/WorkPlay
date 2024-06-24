// redux/timerSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TimerState {
  value: number;
  isRunning: boolean;
}

const initialState: TimerState = {
  value: 0,
  isRunning: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    startTimer(state) {
      if (state.value > 0) {
        state.isRunning = true;
      }
    },
    pauseTimer(state) {
      state.isRunning = false;
    },
    stopTimer(state) {
      state.value = 0;
      state.isRunning = false;
    },
    decrementTimer(state) {
      if (state.isRunning && state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

export const {
  setTimerValue,
  startTimer,
  pauseTimer,
  stopTimer,
  decrementTimer,
} = timerSlice.actions;
export default timerSlice.reducer;
