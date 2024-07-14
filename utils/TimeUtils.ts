import AsyncStorage from "@react-native-async-storage/async-storage";

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