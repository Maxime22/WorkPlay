import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {AddActivity} from './components/AddActivity/AddActivity';
import {WorkInput} from './components/WorkInput/WorkInput';
import {
  loadInputs,
  addInput as addInputUtil,
  deleteInput as deleteInputUtil,
} from './utils/StorageUtils';
import PushNotification from 'react-native-push-notification';
import './utils/PushNotificationConfig';

const WorkPlayApp = () => {
  const [inputs, setInputs] = useState<string[]>([]);

  useEffect(() => {
    loadInputs(setInputs);

    // Schedule the notification
    console.log('Scheduling notification');
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id', // Ensure you use the same channel ID as created in PushNotificationConfig
      message: 'Fin de jeu', // (required)
      date: new Date(Date.now() + 10 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  }, []);

  const addInput = (title: string) => {
    addInputUtil(inputs, title, setInputs);
  };

  const deleteInput = (index: number) => {
    deleteInputUtil(inputs, index, setInputs);
  };

  return (
    <View className="flex-1 padding-16">
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
