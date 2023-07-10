import React from 'react';
import MyModal from './MyModal';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {translate} from '../../../Translations';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

const BoardsControlModal = ({
  isVisible,
  controlFunction,
  addBoard,
  editBoard,
  deleteBoard,
  addWidget,
}) => {
  return (
    <MyModal isVisible={isVisible} closeFunction={() => controlFunction(false)}>
      <TouchableOpacity
        style={styles.button}
        onPress={addBoard}
        activeOpacity={0.5}>
        <Text style={styles.buttonText}>{translate('add_board')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={editBoard}
        activeOpacity={0.5}>
        <Text style={styles.buttonText}>{translate('edit_board')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={deleteBoard}
        activeOpacity={0.5}>
        <Text style={styles.buttonText}>{translate('delete_board')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={addWidget}
        activeOpacity={0.5}>
        <Text style={styles.buttonText}>{translate('add_widget2')}</Text>
      </TouchableOpacity>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 16,
  },
});

export default BoardsControlModal;
