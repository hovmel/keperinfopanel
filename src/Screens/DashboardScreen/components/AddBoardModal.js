import React from 'react';
import MyModal from './MyModal';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';
import {translate} from '../../../Translations';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

const AddBoardModal = ({
  isVisible,
  controlFunction,
  newBoardName,
  setNewBoardName,
  chosenObject,
  setChosenObject,
  choseObject,
  add,
  addButtonDisabled,
}) => {
  return (
    <MyModal isVisible={isVisible} closeFunction={() => controlFunction(false)}>
      <Text style={styles.title}>Board name:</Text>
      <TextInput
        style={styles.input}
        value={newBoardName}
        onChangeText={setNewBoardName}
      />
      <Text style={styles.title}>Object:</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.object}
        onPress={choseObject}>
        <Text style={styles.objectTitle}>
          {chosenObject ? chosenObject.Name : translate('choose_object')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          addButtonDisabled && {backgroundColor: Colors.lightGray},
        ]}
        onPress={add}
        disabled={addButtonDisabled}>
        <Text style={styles.buttonText}>{translate('add')}</Text>
      </TouchableOpacity>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  object: {
    backgroundColor: '#f3f3f3',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  objectTitle: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderColor: Colors.lightGray,
    marginBottom: 10,
    fontFamily: Fonts.mediumFontFamily,
  },
  title: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.main,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.white,
    fontSize: 14,
  },
});

export default AddBoardModal;
