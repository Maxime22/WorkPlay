import React from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import TimerComponent from './components/Timer/TimerComponent';

const WorkPlayApp = () => {
  return (
    <Provider store={store}>
      <View className="flex-1 justify-center items-center">
        <Text>Hello, Maxou!</Text>
        <TimerComponent />
      </View>
    </Provider>
  );
};
export default WorkPlayApp;
