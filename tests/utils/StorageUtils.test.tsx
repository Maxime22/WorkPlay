import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadInputs,
  saveInputs,
  addInput,
  deleteInput,
  loadRemainingTime,
  saveRemainingTime,
} from '../../utils/StorageUtils.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('storageUtils', () => {
  const mockInputs = [
    {title: 'Task 1', value: 'Value 1', id: '1'},
    {title: 'Task 2', value: 'Value 2', id: '2'},
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
    const newInput = {title: 'Task 3', value: 'Value 3', id: '3'};
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

  it('saves remaining time correctly', async () => {
    const mockTime = 120; // 2 minutes
    await saveRemainingTime(mockTime);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'remainingTime',
      expect.stringMatching(/{"time":120,"timestamp":[0-9]+}/),
    );
  });

  it('loads remaining time correctly', async () => {
    const mockTime = 120; // 2 minutes
    const mockTimestamp = new Date().getTime();
    const mockStoredData = {time: mockTime, timestamp: mockTimestamp};

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockStoredData),
    );

    const remainingTime = await loadRemainingTime();

    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - mockTimestamp) / 1000);
    const expectedRemainingTime = mockTime - elapsedTime;

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('remainingTime');
    expect(remainingTime).toBe(expectedRemainingTime);
  });

  it('handles loading remaining time with no stored data', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const remainingTime = await loadRemainingTime();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('remainingTime');
    expect(remainingTime).toBeNull();
  });
});
