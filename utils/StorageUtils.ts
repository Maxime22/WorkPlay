import AsyncStorage from '@react-native-async-storage/async-storage';

import {InputItem} from '../App.tsx';

export const loadInputs = async (
  setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
) => {
  try {
    const storedInputs = await AsyncStorage.getItem('inputs');
    if (storedInputs) {
      setInputs(JSON.parse(storedInputs));
    }
  } catch (error) {
    console.error('Failed to load inputs', error);
  }
};

export const saveInputs = async (inputs: InputItem[]) => {
  try {
    await AsyncStorage.setItem('inputs', JSON.stringify(inputs));
  } catch (error) {
    console.error('Failed to save inputs', error);
  }
};

export const addInput = (
  inputs: InputItem[],
  newInput: InputItem,
  setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
) => {
  const newInputs = [...inputs, newInput];
  setInputs(newInputs);
  saveInputs(newInputs);
};

export const deleteInput = (
  inputs: InputItem[],
  id: string,
  setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
) => {
  const newInputs = inputs.filter(input => input.id !== id);
  setInputs(newInputs);
  saveInputs(newInputs);
};

export const saveRemainingTime = async (time: number) => {
  try {
    const timestamp = new Date().getTime();
    await AsyncStorage.setItem(
      'remainingTime',
      JSON.stringify({time, timestamp}),
    );
  } catch (error) {
    console.error('Failed to save remaining time', error);
  }
};

export const loadRemainingTime = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('remainingTime');
    if (jsonValue != null) {
      const {time, timestamp} = JSON.parse(jsonValue);
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - timestamp) / 1000);
      return time - elapsedTime;
    }
    return null;
  } catch (error) {
    console.error('Failed to load remaining time', error);
    return null;
  }
};
