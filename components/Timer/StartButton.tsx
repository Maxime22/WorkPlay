import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {startTimer} from '../../redux/slices/timerSlice';
import {TextInput} from 'react-native';

interface StartButtonProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const StartButton: React.FC<StartButtonProps> = ({
  inputValue,
  setInputValue,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
      />
      <Button
        onPress={() => dispatch(startTimer(Number(inputValue)))}
        title="Start"
        color="#4CAF50"
      />
    </>
  );
};

export default StartButton;
