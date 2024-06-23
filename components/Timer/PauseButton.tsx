import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {pauseTimer} from '../../redux/slices/timerSlice';

const PauseButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onPress={() => dispatch(pauseTimer())}
      title="Pause"
      color="#FF9800"
    />
  );
};

export default PauseButton;
