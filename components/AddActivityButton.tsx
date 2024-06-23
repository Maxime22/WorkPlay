import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

type AddActivityButtonProps = {
    onPress: () => void;
};
export const AddActivityButton = ({ onPress }:AddActivityButtonProps) => {

  return (
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
                  <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
          </View>
  );

};

const styles = StyleSheet.create({
        buttonContainer: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        button: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#2196F3',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
        },
        buttonText: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
        },
});