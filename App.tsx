import React, {useState, useEffect} from 'react';
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


const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<string[]>([]);

  useEffect(() => {
    loadInputs(setInputs);
  }, []);

  const addInput = (title: string) => {
    addInputUtil(inputs, title, setInputs);
  };

  const deleteInput = (index: number) => {
    deleteInputUtil(inputs, index, setInputs);
  };

  return (
    <View className="flex-1 padding-16">
      <Countdown />
      <FlatList
        data={inputs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <WorkInput
            inputTitle={item}
            deleteInput={deleteInput}
            index={index}
          />
        )}
      />
      <AddActivity addInput={addInput} />
    </View>
  );
};

export default WorkPlayApp;
