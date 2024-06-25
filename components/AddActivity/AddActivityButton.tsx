import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './AddActivityButton.style.ts';
import React from 'react';

type AddActivityButtonProps = {
  onPress: () => void;
};
export const AddActivityButton = ({onPress}: AddActivityButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
