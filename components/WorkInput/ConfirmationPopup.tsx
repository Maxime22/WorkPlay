import React from 'react';
import {View, Text, Button, Modal} from 'react-native';
import {styles} from './ConfirmationPopup.style';

type ConfirmationPopupProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationPopup = ({
  visible,
  onConfirm,
  onCancel,
}: ConfirmationPopupProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Supprimer ?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Oui" onPress={onConfirm} />
            <Button title="Non" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopup;
