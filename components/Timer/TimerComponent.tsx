// components/TimerComponent.tsx
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import TimerDisplay from './TimerDisplay';
import StartButton from './StartButton';
import PauseButton from './PauseButton';
import {decrementTimer, pauseTimer} from '../../redux/slices/timerSlice';
import {RootState} from '../../redux/store';
import StopButton from './StopButton';

const TimerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state: RootState) => state.timer);
  const [inputValue, setInputValue] = useState<string>('0');

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer.isRunning) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    if (timer.value === 0) {
      dispatch(pauseTimer());
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.isRunning, timer.value, dispatch]);

  return (
    <View className="flex-1 justify-center items-center p-4">
      <TimerDisplay />
      <StartButton inputValue={inputValue} setInputValue={setInputValue} />
      <PauseButton />
      <StopButton />
    </View>
  );
};

export default TimerComponent;
