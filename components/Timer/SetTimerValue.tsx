import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, TextInput, Button} from 'react-native';
import {setTimerValue} from '../../redux/slices/timerSlice';

const SetTimerValue: React.FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('0');

  const handleSetTimerValue = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value >= 0) {
      dispatch(setTimerValue(value));
    }
  };

  return (
    <View>
      <TextInput
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Set Timer" onPress={handleSetTimerValue} />
    </View>
  );
};

export default SetTimerValue;
