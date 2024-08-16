import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ConfirmationPopup from '../../../components/WorkInput/ConfirmationPopup';

describe('ConfirmationPopup', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    visible: true,
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  it('renders correctly when visible is true', () => {
    const {getByText} = render(<ConfirmationPopup {...props} />);
    expect(getByText('Supprimer ?')).toBeTruthy();
    expect(getByText('Non')).toBeTruthy();
    expect(getByText('Oui')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const {queryByText} = render(
      <ConfirmationPopup {...props} visible={false} />,
    );
    expect(queryByText('Supprimer ?')).toBeNull();
  });

  it('calls onCancel when Non button is pressed', () => {
    const {getByText} = render(<ConfirmationPopup {...props} />);
    fireEvent.press(getByText('Non'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls onConfirm when Oui button is pressed', () => {
    const {getByText} = render(<ConfirmationPopup {...props} />);
    fireEvent.press(getByText('Oui'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
