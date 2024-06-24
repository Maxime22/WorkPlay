import React, { useState, useEffect } from 'react';
import {FlatList, View} from 'react-native';
import { AddActivity } from './components/AddActivity/AddActivity.tsx';
import { WorkInput } from "./components/WorkInput/WorkInput.tsx";
import { loadInputs, addInput as addInputUtil, deleteInput as deleteInputUtil } from './utils/StorageUtils.ts';

const WorkPlayApp = () => {
    const [inputs, setInputs] = useState<string[]>([]);

    useEffect(() => {
        loadInputs(setInputs);
    }, []);

    const addInput = (title: string) => {
        addInputUtil(inputs, title, setInputs);
    };

    const deleteInput = (index: number) => {
        deleteInputUtil(inputs, index, setInputs);
    };

    return (
        <View className='flex-1 padding-16'>
            <FlatList
                data={inputs}
                keyExtractor={(index) => {
                    return index.toString();
                }}
                renderItem={({ item, index }) => (
                    <WorkInput inputTitle={item} deleteInput={deleteInput} index={index} />
                )}
            />
            <AddActivity addInput={addInput} />
        </View>
    );
};

export default WorkPlayApp;
