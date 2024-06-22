import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {AddActivityButton} from './components/AddActivityButton.tsx';


const WorkPlayApp = () => {
    const addActivity = () => {
        //         setActivities([...activities, { title: newTitle, value: '' }]);
        //     }
    };
  return (
      <View className='flex-1 justify-center items-center'>
          <AddActivityButton />
      </View>
  );
};

export default WorkPlayApp;
