import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const TimerDisplay: React.FC = () => {
  const timer = useSelector((state: RootState) => state.timer);

  return (
    <View>
      <Text>{timer.value}</Text>
    </View>
  );
};

export default TimerDisplay;
