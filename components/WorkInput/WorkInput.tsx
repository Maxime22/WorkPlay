import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './WorkInput.style.ts';

type WorkInputProps = {
  inputTitle: string;
  index: number;
  deleteInput: (index: number) => void;
};
export const WorkInput = ({inputTitle, index, deleteInput}: WorkInputProps) => {
  return (
    <View key={index} style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter value"
      />
      <TouchableOpacity
        onPress={() => deleteInput(index)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
