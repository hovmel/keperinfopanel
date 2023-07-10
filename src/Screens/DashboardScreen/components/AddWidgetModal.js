import React, {useEffect, useState} from 'react';
import MyModal from './MyModal';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {translate} from '../../../Translations';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

const AddWidgetModal = ({
  isVisible,
  controlFunction,
  newWidgetName,
  setNewWidgetName,
  statesList,
  statePressed,
  add
}) => {
  const [maxReached, setMaxReached] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  useEffect(() => {
    const selectedCount = statesList.filter(item => item.chosen).length;
    setMaxReached(selectedCount >= 2);
  }, [statesList]);

  useEffect(() => {
    if (newWidgetName && maxReached) {
      setAddButtonDisabled(false);
    } else {
      setAddButtonDisabled(true);
    }
  }, [newWidgetName, maxReached]);

  const _renderItem = ({item}) => {
    const disabled = maxReached && !item.chosen;
    return disabled ? (
      <View style={[styles.checkboxItem, styles.disabled]}>
        <View style={styles.checkbox} />
        <Text style={styles.checkboxText}>{item.DefaultFieldName}</Text>
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => statePressed(item)}
        style={styles.checkboxItem}>
        <View style={styles.checkbox}>
          {item.chosen && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxText}>{item.DefaultFieldName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MyModal isVisible={isVisible} closeFunction={() => controlFunction(false)}>
      <Text style={styles.title}>Widget name:</Text>
      <TextInput
        style={styles.input}
        value={newWidgetName}
        onChangeText={setNewWidgetName}
      />
      <Text style={styles.title}>States (2):</Text>
      <FlatList
        style={styles.statesWrapper}
        data={statesList}
        renderItem={_renderItem}
        keyExtractor={item => item.DefaultFieldName}
      />
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

  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.main,
    padding: 3,
    marginHorizontal: 15,
  },
  checkboxInner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: Colors.main,
  },
  checkboxText: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 14,
  },
  statesWrapper: {
    maxHeight: 200,
  },
  disabled: {
    opacity: 0.5
  }
});

export default AddWidgetModal;
