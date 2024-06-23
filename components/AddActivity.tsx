import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AddActivityButton } from './AddActivityButton';

type AddActivityProps = {
    addInput: (title:string) => void;
};
export const AddActivity = ({addInput}:AddActivityProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleSaveTitle = () => {
        addInput(newTitle);
        setNewTitle('');
        setModalVisible(false);
    };

    return (
        <View style={styles.addActivityContainer}>
            <AddActivityButton onPress={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter Title:</Text>
                        <TextInput
                            style={styles.input}
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <Button title="Save" onPress={handleSaveTitle} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    addActivityContainer: {
        flex: 1,
        position:'relative',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
