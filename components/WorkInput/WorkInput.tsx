import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './WorkInput.style.ts';
import {TimeDifficultyRatio} from '../TimeDifficultyRatio/TimeDifficultyRatio.tsx';

type WorkInputProps = {
  inputTitle: string;
  id: string;
  deleteInput: () => void;
  timeActivity: string;
  ratio: string;
    handleRatioChange: (id: string, ratio: string) => void;
  onTimeActivityChange: (id: string, value: string) => void;
  isDisabled: boolean;
};
export const WorkInput = ({
  inputTitle,
  id,
  deleteInput,
  timeActivity,
  ratio,
                              handleRatioChange,
  onTimeActivityChange,
  isDisabled,
}: WorkInputProps) => {

  return (
    <View key={id} style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter value"
        value={timeActivity}
        onChangeText={text => onTimeActivityChange(id, text)}
        editable={!isDisabled}
      />
      <TimeDifficultyRatio
        selectedRatio={ratio}
        onRatioChange={value=> handleRatioChange(id, value)}
      />
      <TouchableOpacity onPress={deleteInput} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
