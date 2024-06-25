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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads inputs correctly', async () => {
    const mockSetInputs = jest.fn();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(['Task 1', 'Task 2']),
    );

    await loadInputs(mockSetInputs);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('inputs');
    expect(mockSetInputs).toHaveBeenCalledWith(['Task 1', 'Task 2']);
  });

  it('handles loading inputs with no stored data', async () => {
    const mockSetInputs = jest.fn();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await loadInputs(mockSetInputs);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('inputs');
    expect(mockSetInputs).not.toHaveBeenCalled();
  });

  it('saves inputs correctly', async () => {
    await saveInputs(['Task 1', 'Task 2']);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(['Task 1', 'Task 2']),
    );
  });

  it('adds an input correctly', async () => {
    const mockSetInputs = jest.fn();
    await addInput(['Task 1'], 'Task 2', mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(['Task 1', 'Task 2']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(['Task 1', 'Task 2']),
    );
  });

  it('deletes an input correctly', async () => {
    const mockSetInputs = jest.fn();
    await deleteInput(['Task 1', 'Task 2'], 0, mockSetInputs);

    expect(mockSetInputs).toHaveBeenCalledWith(['Task 2']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'inputs',
      JSON.stringify(['Task 2']),
    );
  });
});
