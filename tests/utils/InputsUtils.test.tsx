import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadInputs,
  saveInputs,
  addInput,
  deleteInput,
  resetInputs,
  handleRatioChange,
  handleTimeActivityChange,
} from '../../utils/InputsUtils.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('inputsUtils', () => {
  const mockInputs = [
    {title: 'Task 1', value: 'Value 1', id: '1', ratio: '1'},
    {title: 'Task 2', value: 'Value 2', id: '2', ratio: '1'},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads inputs correctly', async () => {
    const mockSetInputs = jest.fn();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockInputs),
    );

    await loadInputs(mockSetInputs);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('inputs');
    expect(mockSetInputs).toHaveBeenCalledWith(mockInputs);
  });

  it('handles loading inputs with no stored data', async () => {
    const mockSetInputs = jest.fn();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await loadInputs(mockSetInputs);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('inputs');
    expect(mockSetInputs).not.toHaveBeenCalled();
  });

  it('saves inputs correctly', async () => {
    await saveInputs(mockInputs);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(mockInputs),
    );
  });

  it('adds an input correctly', async () => {
    const mockSetInputs = jest.fn();
    const newInput = {title: 'Task 3', value: 'Value 3', id: '3', ratio: '1'};
    const expectedInputs = [...mockInputs, newInput];

    addInput(mockInputs, newInput, mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(expectedInputs);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(expectedInputs),
    );
  });

  it('deletes an input correctly', async () => {
    const mockSetInputs = jest.fn();
    const expectedInputs = [mockInputs[1]]; // Remove the first item

    deleteInput(mockInputs, '1', mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(expectedInputs);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(expectedInputs),
    );
  });

  it('resets inputs correctly', async () => {
    const mockSetInputs = jest.fn();
    const expectedInputs = mockInputs.map(input => ({...input, value: '0'}));

    resetInputs(mockInputs, mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(expectedInputs);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(expectedInputs),
    );
  });

  it('handles time activity change correctly', async () => {
    const mockSetInputs = jest.fn();
    const id = '1';
    const newValue = 'New Value 1';
    const expectedInputs = mockInputs.map(input =>
      input.id === id ? {...input, value: newValue} : input,
    );

    handleTimeActivityChange(id, newValue, mockInputs, mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(expectedInputs);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(expectedInputs),
    );
  });

  it('handles ratio change correctly', async () => {
    const mockSetInputs = jest.fn();
    const id = '2';
    const newRatio = '2';
    const expectedInputs = mockInputs.map(input =>
      input.id === id ? {...input, ratio: newRatio} : input,
    );

    handleRatioChange(id, newRatio, mockInputs, mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(expectedInputs);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(expectedInputs),
    );
  });
});
