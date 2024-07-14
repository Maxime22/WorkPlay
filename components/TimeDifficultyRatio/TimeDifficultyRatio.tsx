import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './TimeDifficultyRatio.style.ts';
import {Picker} from '@react-native-picker/picker';

type TimeDifficultyRatioProps = {
  selectedRatio: string;
  onRatioChange: (value: string) => void;
  id: string;
};

export const TimeDifficultyRatio = ({
  selectedRatio,
  onRatioChange,
  id,
}: TimeDifficultyRatioProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulté</Text>
      <Picker
        testID={`picker-${id}`}
        selectedValue={selectedRatio}
        style={styles.picker}
        onValueChange={onRatioChange}>
        <Picker.Item label="Simple" value="1" />
        <Picker.Item label="Normal" value="2" />
        <Picker.Item label="Difficile" value="3" />
      </Picker>
    </View>
  );
};
