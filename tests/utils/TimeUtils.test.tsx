import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadRemainingTime, saveRemainingTime} from '../../utils/TimeUtils.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('timeUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
