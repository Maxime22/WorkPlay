import AsyncStorage from '@react-native-async-storage/async-storage';

type InputItem = { title: string; value: string };

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
  index: number,
  setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
) => {
  const newInputs = inputs.filter((_, i) => i !== index);
  setInputs(newInputs);
  saveInputs(newInputs);
};
