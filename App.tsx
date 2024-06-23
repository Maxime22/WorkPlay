import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AddActivity } from './components/AddActivity.tsx';
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkPlayApp = () => {
    const [inputs, setInputs] = useState<string[]>([]);

    useEffect(() => {
        loadInputs();
    }, []);

    const loadInputs = async () => {
        try {
            const storedInputs = await AsyncStorage.getItem('inputs');
            if (storedInputs) {
                setInputs(JSON.parse(storedInputs));
            }
        } catch (error) {
            console.error('Failed to load inputs', error);
        }
    };

    const saveInputs = async (newInputs: string[]) => {
        try {
            await AsyncStorage.setItem('inputs', JSON.stringify(newInputs));
        } catch (error) {
            console.error('Failed to save inputs', error);
        }
    };

    const addInput = (title: string) => {
        const newInputs = [...inputs, title];
        setInputs(newInputs);
        saveInputs(newInputs);
    };

    const deleteInput = (index: number) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
        saveInputs(newInputs);
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
                    <TouchableOpacity onPress={() => deleteInput(index)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
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
    deleteButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#ff4d4d',
        borderRadius: 4,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WorkPlayApp;
