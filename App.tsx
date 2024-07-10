import React, {useState, useEffect} from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {AddActivity} from './components/AddActivity/AddActivity';
import {WorkInput} from './components/WorkInput/WorkInput';
import {
  loadInputs,
  addInput,
  deleteInput,
  resetInputs,
} from './utils/StorageUtils';
import './utils/notification/PushNotificationConfig';
import {Countdown} from './components/Countdown/Countdown.tsx';
import {InputItem} from './models/InputItem.ts';

export const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    loadInputs(setInputs);
  }, []);

  const handleTimeActivityChange = (id: string, value: string) => {
    const newInputs = inputs.map(input =>
      input.id === id ? {...input, value} : input,
    );
    setInputs(newInputs);
  };

  const calculateUserTime = (): number => {
    if (inputs !== undefined && inputs.length > 0) {
      return inputs.reduce((total, input) => {
        const value = parseFloat(input.value);
        return !isNaN(value) ? total + value : total;
      }, 0);
    } else {
      return 0;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 padding-16">
        <Countdown
          calculateUserTime={calculateUserTime}
          resetInputs={() => resetInputs(inputs, setInputs)}
          onStart={() => {
            setIsCountdownRunning(true);
          }}
          onStop={() => {
            setIsCountdownRunning(false);
          }}
        />
        <FlatList
          data={inputs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <WorkInput
              inputTitle={item.title}
              deleteInput={() => {
                deleteInput(inputs, item.id, setInputs);
              }}
              id={item.id}
              timeActivity={item.value}
              onTimeActivityChange={handleTimeActivityChange}
              isDisabled={isCountdownRunning}
            />
          )}
        />
        <AddActivity
          addInput={(title: string) => {
            const newInput: InputItem = {
              title,
              value: '',
              id: Math.random().toString(),
            };
            addInput(inputs, newInput, setInputs);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkPlayApp;
