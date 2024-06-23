import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { AddActivity } from './components/AddActivity.tsx';

const WorkPlayApp = () => {
    const [inputs, setInputs] = useState<string[]>([]);

    const addInput = (title: string) => {
        setInputs([...inputs, title]);
    };

    return (
        <View style={styles.container}>
            {inputs.map((inputTitle, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>{inputTitle}</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>
            ))}
            <AddActivity addInput={addInput} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 4,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
});

export default WorkPlayApp;
