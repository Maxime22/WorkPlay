import React, {useState, useEffect} from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {AddActivity} from './components/AddActivity/AddActivity';
import {WorkInput} from './components/WorkInput/WorkInput';
import {
  loadInputs,
  addInput as addInputUtil,
  deleteInput as deleteInputUtil,
  saveInputs,
} from './utils/StorageUtils';
import './utils/notification/PushNotificationConfig';
import {Countdown} from './components/Countdown/Countdown.tsx';

export type InputItem = {
  title: string;
  value: string;
  id: string;
  ratio: string;
};
export const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    loadInputs(setInputs);
  }, []);

  const addInput = (title: string) => {
    const newInput: InputItem = {
      title,
      value: '',
      id: Math.random().toString(),
      ratio: '1',
    };
    addInputUtil(inputs, newInput, setInputs);
  };

  const deleteInput = (id: string) => {
    deleteInputUtil(inputs, id, setInputs);
  };

  const handleTimeActivityChange = (id: string, value: string) => {
    const newInputs = inputs.map(input =>
      input.id === id ? {...input, value} : input,
    );
    setInputs(newInputs);
    saveInputs(newInputs);
  };

  const handleRatioChange = (id: string, ratio: string) => {
    const newInputs = inputs.map(input =>
      input.id === id ? {...input, ratio} : input,
    );
    setInputs(newInputs);
    saveInputs(newInputs);
  };

  const calculateUserTime = (): number => {
    if (inputs !== undefined && inputs.length > 0) {
      return inputs.reduce((total, input) => {
        const value = parseFloat(input.value);
        const ratio = parseFloat(input.ratio);
        return !isNaN(value) && !isNaN(ratio) ? total + value * ratio : total;
      }, 0);
    } else {
      return 0;
    }
  };

  const resetInputs = () => {
    const newInputs = inputs.map(input => ({...input, value: '0'}));
    setInputs(newInputs);
    saveInputs(newInputs);
  };

  const handleStartCountdown = () => {
    setIsCountdownRunning(true);
  };

  const handleStopCountdown = () => {
    setIsCountdownRunning(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 padding-16">
        <Countdown
          calculateUserTime={calculateUserTime}
          resetInputs={resetInputs}
          onStart={handleStartCountdown}
          onStop={handleStopCountdown}
        />
        <FlatList
          data={inputs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <WorkInput
              inputTitle={item.title}
              deleteInput={() => deleteInput(item.id)}
              id={item.id}
              timeActivity={item.value}
              ratio={item.ratio}
              handleRatioChange={handleRatioChange}
              onTimeActivityChange={handleTimeActivityChange}
              isDisabled={isCountdownRunning}
            />
          )}
        />
        <AddActivity addInput={addInput} />
      </View>
    </SafeAreaView>
  );
};

export default WorkPlayApp;
