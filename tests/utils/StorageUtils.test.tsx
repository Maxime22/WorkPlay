import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadInputs,
  saveInputs,
  addInput,
  deleteInput,
} from '../../utils/StorageUtils.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('storageUtils', () => {
  const mockInputs = [
    { title: 'Task 1', value: 'Value 1', id: '1' },
    { title: 'Task 2', value: 'Value 2', id: '2' },
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
    const newInput = { title: 'Task 3', value: 'Value 3', id: '3' };
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
});
