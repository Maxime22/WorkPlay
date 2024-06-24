import {
  TimerState,
  decrementTimer,
  pauseTimer,
  setTimerValue,
  startTimer,
  stopTimer,
} from '../../../redux/slices/timerSlice';
import timerReducer from '../../../redux/slices/timerSlice';

describe('timer reducer', () => {
  const initialState: TimerState = {
    value: 0,
    isRunning: false,
  };

  it('should handle initial state', () => {
    expect(timerReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle setTimerValue', () => {
    const actual = timerReducer(initialState, setTimerValue(10));
    expect(actual.value).toEqual(10);
  });

  it('should handle startTimer', () => {
    const stateWithValue = {value: 10, isRunning: false};
    const actual = timerReducer(stateWithValue, startTimer());
    expect(actual.isRunning).toEqual(true);
  });

  it('should not start timer if value is 0', () => {
    const actual = timerReducer(initialState, startTimer());
    expect(actual.isRunning).toEqual(false);
  });

  it('should handle pauseTimer', () => {
    const runningState = {value: 10, isRunning: true};
    const actual = timerReducer(runningState, pauseTimer());
    expect(actual.isRunning).toEqual(false);
  });

  it('should handle stopTimer', () => {
    const runningState = {value: 10, isRunning: true};
    const actual = timerReducer(runningState, stopTimer());
    expect(actual.value).toEqual(0);
    expect(actual.isRunning).toEqual(false);
  });

  it('should handle decrementTimer', () => {
    const runningState = {value: 10, isRunning: true};
    const actual = timerReducer(runningState, decrementTimer());
    expect(actual.value).toEqual(9);
  });

  it('should not decrement timer if not running', () => {
    const stateWithValue = {value: 10, isRunning: false};
    const actual = timerReducer(stateWithValue, decrementTimer());
    expect(actual.value).toEqual(10);
  });

  it('should not decrement timer below 0', () => {
    const runningState = {value: 0, isRunning: true};
    const actual = timerReducer(runningState, decrementTimer());
    expect(actual.value).toEqual(0);
  });
});
