import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {stopTimer} from '../../redux/slices/timerSlice';

const StopButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onPress={() => dispatch(stopTimer())}
      title="Stop"
      color="#f44336"
    />
  );
};

export default StopButton;
