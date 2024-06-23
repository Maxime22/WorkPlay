import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const TimerDisplay: React.FC = () => {
  const timer = useSelector((state: RootState) => state.timer);

  return (
    <View className="p-4 bg-gray-100 rounded-lg mb-4">
      <Text className="text-xl">{timer.value}</Text>
    </View>
  );
};

export default TimerDisplay;
