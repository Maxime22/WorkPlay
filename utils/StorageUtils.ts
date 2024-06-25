import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadInputs = async (
  setInputs: React.Dispatch<React.SetStateAction<string[]>>,
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

export const saveInputs = async (inputs: string[]) => {
  try {
    await AsyncStorage.setItem('inputs', JSON.stringify(inputs));
  } catch (error) {
    console.error('Failed to save inputs', error);
  }
};

export const addInput = (
  inputs: string[],
  title: string,
  setInputs: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const newInputs = [...inputs, title];
  setInputs(newInputs);
  saveInputs(newInputs);
};

export const deleteInput = (
  inputs: string[],
  index: number,
  setInputs: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const newInputs = inputs.filter((_, i) => i !== index);
  setInputs(newInputs);
  saveInputs(newInputs);
};
