import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TimeDifficultyRatio} from '../../../components/TimeDifficultyRatio/TimeDifficultyRatio';

describe('TimeDifficultyRatio', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <TimeDifficultyRatio selectedRatio="1" onRatioChange={() => {}} id="1" />,
    );

    // Vérifier que le texte du label est correct
    expect(getByText('Difficulté')).toBeTruthy();
  });

  it('calls onRatioChange with the correct value when a new item is selected', () => {
    const onRatioChangeMock = jest.fn();
    const {getByTestId} = render(
      <TimeDifficultyRatio
        selectedRatio="1"
        onRatioChange={onRatioChangeMock}
        id="1"
      />,
    );

    const picker = getByTestId('picker-1');

    // Simuler le changement de valeur
    fireEvent(picker, 'onValueChange', '2');
    fireEvent(picker, 'onValueChange', '3');

    // Vérifier que onRatioChange est appelé avec les bonnes valeurs
    expect(onRatioChangeMock).toHaveBeenCalledWith('2');
    expect(onRatioChangeMock).toHaveBeenCalledWith('3');
  });

  it('renders all picker items correctly', () => {
    const {getByTestId} = render(
      <TimeDifficultyRatio selectedRatio="1" onRatioChange={() => {}} id="1" />,
    );

    const picker = getByTestId('picker-1');
    const items = picker.props.items;

    // Vérifier que toutes les options du Picker sont présentes
    expect(items.length).toBe(3);
    expect(items[0].label).toBe('Simple');
    expect(items[1].label).toBe('Normal');
    expect(items[2].label).toBe('Difficile');
  });
});
