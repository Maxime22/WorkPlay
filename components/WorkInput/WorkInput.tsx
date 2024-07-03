import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './WorkInput.style.ts';

type WorkInputProps = {
  inputTitle: string;
  id: string;
  deleteInput: () => void;
  timeActivity: string;
  onTimeActivityChange: (id: string, value: string) => void;
  isDisabled: boolean;
};
export const WorkInput = ({
  inputTitle,
  id,
  deleteInput,
  timeActivity,
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
      <TouchableOpacity onPress={deleteInput} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
