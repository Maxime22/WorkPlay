import React, {useState, useEffect} from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {AddActivity} from './components/AddActivity/AddActivity';
import {WorkInput} from './components/WorkInput/WorkInput';
import {
  loadInputs,
  addInput,
  deleteInput,
  resetInputs,
  handleTimeActivityChange,
  handleRatioChange,
} from './utils/InputsUtils.ts';
import './utils/notification/PushNotificationConfig';
import {Countdown} from './components/Countdown/Countdown.tsx';
import {InputItem} from './models/InputItem.ts';

export const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    loadInputs(setInputs);
  }, []);

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
              deleteInput={() => deleteInput(inputs, item.id, setInputs)}
              id={item.id}
              timeActivity={item.value}
              ratio={item.ratio}
              handleRatioChange={(id, text) =>
                handleRatioChange(id, text, inputs, setInputs)
              }
              onTimeActivityChange={(id, text) =>
                handleTimeActivityChange(id, text, inputs, setInputs)
              }
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
              ratio: '1',
            };
            addInput(inputs, newInput, setInputs);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkPlayApp;
