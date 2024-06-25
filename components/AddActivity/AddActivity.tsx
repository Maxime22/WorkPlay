import React, { useState } from 'react';
import {View, Modal, TextInput, Button, Text, Alert, TouchableOpacity} from 'react-native';
import { AddActivityButton } from './AddActivityButton.tsx';
import { styles } from './AddActivity.style.ts';

type AddActivityProps = {
    addInput: (title:string) => void;
};
export const AddActivity = ({addInput}:AddActivityProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleSaveTitle = () => {
        if (newTitle.trim() !== '') {
            addInput(newTitle);
            setNewTitle('');
            setModalVisible(false);
        } else {
            Alert.alert('Title cannot be empty');
        }
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
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Enter Title:</Text>
                        <TextInput
                            style={styles.input}
                            value={newTitle}
                            onChangeText={setNewTitle}
                            placeholder="Enter Title"
                        />
                        <Button title="Save" onPress={handleSaveTitle} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


