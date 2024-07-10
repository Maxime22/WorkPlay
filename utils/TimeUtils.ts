import {InputItem} from '../models/InputItem';

export const calculateUserTime = (inputs: InputItem[]): number => {
  if (inputs !== undefined && inputs.length > 0) {
    return inputs.reduce((total, input) => {
      const value = parseFloat(input.value);
      return !isNaN(value) ? total + value : total;
    }, 0);
  } else {
    return 0;
  }
};
