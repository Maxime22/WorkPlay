import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {startTimer} from '../../redux/slices/timerSlice';

const StartButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onPress={() => dispatch(startTimer())}
      title="Start"
      color="#4CAF50"
    />
  );
};

export default StartButton;
