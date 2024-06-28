import React, {useState, useEffect, useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {AddActivity} from './components/AddActivity/AddActivity';
import {WorkInput} from './components/WorkInput/WorkInput';
import {
  loadInputs,
  addInput as addInputUtil,
  deleteInput as deleteInputUtil,
} from './utils/StorageUtils';
import './utils/notification/PushNotificationConfig';
import {Countdown} from './components/Countdown/Countdown.tsx';

type InputItem = { title: string; value: string };

const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);

    useEffect(() => {
        loadInputs(setInputs);
    }, []);

    const addInput = (title: string) => {
        const newInput: InputItem = { title, value: '' };
        addInputUtil(inputs, newInput, setInputs);
    };

  const deleteInput = (index: number) => {
      deleteInputUtil(inputs, index, setInputs);
  };

    const handleTimeActivityChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
    };

    const calculateUserTime = (): number => {
        return inputs.reduce((total, input) => total + parseFloat(input.value || '0'), 0);
    };

    const resetInputs = () => {
        const newInputs = inputs.map(input => ({ ...input, value: '0' }));
        setInputs(newInputs);
    };

  return (
    <View className="flex-1 padding-16">
      <Countdown calculateUserTime={calculateUserTime} resetInputs={resetInputs} />
      <FlatList
        data={inputs}
        keyExtractor={(index) => index.toString()}
        renderItem={({item, index}) => (
          <WorkInput
            inputTitle={item.title}
            deleteInput={deleteInput}
            index={index}
            timeActivity={item.value}
            onTimeActivityChange={handleTimeActivityChange}
          />
        )}
      />
      <AddActivity addInput={addInput} />
    </View>
  );
};

export default WorkPlayApp;
