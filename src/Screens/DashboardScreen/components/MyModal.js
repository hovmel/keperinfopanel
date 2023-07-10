import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';

const MyModal = ({isVisible, children, closeFunction, style}) => {
  return (
    <Modal
      style={[styles.modal]}
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      useNativeDriver
      onBackdropPress={closeFunction}
      backdropOpacity={0.3}
      onBackButtonPress={closeFunction}>
      <View style={[styles.wrapper, style]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default MyModal;
